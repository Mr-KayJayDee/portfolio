<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

interface Props {
  links: TocLink[]
}

const props = defineProps<Props>()
const { t } = useI18n()

const drawerOpen = ref(false)
const activeId = ref<string | null>(null)
let observer: IntersectionObserver | null = null

const flatIds = computed(() => {
  const ids: string[] = []
  const collect = (nodes: TocLink[]) => {
    for (const node of nodes) {
      ids.push(node.id)
      if (node.children?.length) collect(node.children)
    }
  }
  collect(props.links)
  return ids
})

onMounted(() => {
  if (typeof window === 'undefined') return

  activeId.value = flatIds.value[0] ?? null

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
      if (visible.length > 0) {
        activeId.value = visible[0]!.target.id
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )

  for (const id of flatIds.value) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

function handleItemClick() {
  drawerOpen.value = false
}
</script>

<template>
  <!-- Desktop sticky sidebar -->
  <aside class="hidden lg:block sticky top-24 w-64 self-start">
    <p class="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
      {{ t('blog.toc.title') }}
    </p>
    <ol class="space-y-2 text-sm">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          :class="[
            activeId === link.id
              ? 'text-brand-500 dark:text-brand-400 font-medium'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
            'block transition-colors',
          ]"
        >
          {{ link.text }}
        </a>
        <ol v-if="link.children?.length" class="mt-1 ml-4 space-y-1">
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              :class="[
                activeId === child.id
                  ? 'text-brand-500 dark:text-brand-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                'block transition-colors',
              ]"
            >
              {{ child.text }}
            </a>
          </li>
        </ol>
      </li>
    </ol>
  </aside>

  <!-- Mobile trigger + drawer -->
  <div class="lg:hidden inline-block">
    <UButton
      variant="ghost"
      color="neutral"
      size="sm"
      icon="i-lucide-list"
      :aria-label="t('a11y.blogTocToggle')"
      @click="drawerOpen = true"
    >
      {{ t('blog.toc.title') }}
    </UButton>

    <UDrawer v-model:open="drawerOpen" direction="right">
      <template #header>
        <p class="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {{ t('blog.toc.title') }}
        </p>
      </template>
      <template #body>
        <ol class="space-y-3 text-sm p-4">
          <li v-for="link in links" :key="link.id">
            <a
              :href="`#${link.id}`"
              :class="[
                activeId === link.id
                  ? 'text-brand-500 dark:text-brand-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300',
                'block transition-colors',
              ]"
              @click="handleItemClick"
            >
              {{ link.text }}
            </a>
            <ol v-if="link.children?.length" class="mt-2 ml-4 space-y-2">
              <li v-for="child in link.children" :key="child.id">
                <a
                  :href="`#${child.id}`"
                  :class="[
                    activeId === child.id
                      ? 'text-brand-500 dark:text-brand-400 font-medium'
                      : 'text-gray-500 dark:text-gray-400',
                    'block transition-colors',
                  ]"
                  @click="handleItemClick"
                >
                  {{ child.text }}
                </a>
              </li>
            </ol>
          </li>
        </ol>
      </template>
    </UDrawer>
  </div>
</template>
