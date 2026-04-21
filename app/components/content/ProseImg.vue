<script setup lang="ts">
defineOptions({ inheritAttrs: false })

interface Props {
  src: string
  alt?: string
  title?: string
  caption?: string
  align?: 'left' | 'right' | 'center' | 'full'
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  alt: '',
  align: 'full',
})

const attrs = useAttrs()

const figureClass = computed(() => {
  const base = 'not-prose my-6'

  // Si des classes custom sont passées via MDC {.class}, on retire les classes
  // de layout automatiques — l'utilisateur contrôle tout.
  if (attrs.class) return base

  switch (props.align) {
    case 'left':  return `${base} float-left mr-6 mb-2 w-1/2 max-w-xs`
    case 'right': return `${base} float-right ml-6 mb-2 w-1/2 max-w-xs`
    case 'center': return `${base} mx-auto table`
    default: return `${base} w-full`
  }
})

const figureStyle = computed(() => {
  if (props.width && props.align !== 'full') return `width: ${props.width}px`
  return undefined
})
</script>

<template>
  <figure
    v-bind="attrs"
    :class="figureClass"
    :style="figureStyle"
  >
    <img
      :src="props.src"
      :alt="props.alt"
      :title="props.title || props.caption"
      loading="lazy"
      :class="props.align === 'full' && !attrs.class ? 'w-full rounded-lg' : 'rounded-lg'"
    />
    <figcaption
      v-if="props.caption"
      class="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400 italic"
    >
      {{ props.caption }}
    </figcaption>
  </figure>
</template>
