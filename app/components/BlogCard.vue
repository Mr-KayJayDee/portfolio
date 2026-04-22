<script setup lang="ts">
interface BlogArticle {
  path: string
  title: string
  description?: string
  date: string
  tags?: string[]
  image?: string
  minutes?: number
}

interface Props {
  article: BlogArticle
  variant?: 'default' | 'compact'
  direction?: 'prev' | 'next'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  direction: 'next',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()

// Slug extrait du path '/fr/blog/my-slug' ou '/en/blog/my-slug'
const slug = computed(() => {
  const parts = props.article.path.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? ''
})

const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(props.article.date))
  } catch {
    return props.article.date
  }
})

// Reading time : utilise minutes injecté par hook Nitro, sinon fallback composable
const readingMinutes = computed(() => {
  if (typeof props.article.minutes === 'number') return props.article.minutes
  return useReadingTime(props.article.description ?? '')
})

const directionIcon = computed(() =>
  props.direction === 'prev' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right',
)

const directionLabel = computed(() =>
  props.direction === 'prev' ? t('blog.prevArticle') : t('blog.nextArticle'),
)
</script>

<template>
  <article
    v-if="variant === 'default'"
    class="group relative rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    <!-- Cover image (D-03 : aucun fallback si absent) -->
    <NuxtLink
      v-if="article.image"
      :to="localePath(`/blog/${slug}`)"
      class="block relative overflow-hidden"
    >
      <NuxtImg
        :src="article.image"
        :alt="article.title"
        loading="lazy"
        format="webp"
        width="400"
        height="225"
        class="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
        itemprop="image"
      />
    </NuxtLink>

    <!-- Content -->
    <div class="p-5 sm:p-6 flex flex-col gap-3">
      <!-- Tag + Date -->
      <div class="flex items-center justify-between">
        <UBadge v-if="article.tags?.[0]" color="primary" variant="subtle" itemprop="keywords">
          {{ article.tags[0] }}
        </UBadge>
        <time
          class="text-xs text-gray-400 dark:text-gray-500 font-mono"
          :datetime="article.date"
          itemprop="datePublished"
        >
          {{ formattedDate }}
        </time>
      </div>

      <!-- Title -->
      <h2
        class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
        itemprop="headline"
      >
        {{ article.title }}
      </h2>

      <!-- Description -->
      <p
        v-if="article.description"
        class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed"
        itemprop="description"
      >
        {{ article.description }}
      </p>

      <!-- Footer: reading time + extra tags -->
      <div class="flex items-center justify-between pt-2">
        <span
          class="text-xs text-gray-400 dark:text-gray-500 font-medium inline-flex items-center gap-1.5"
        >
          <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
          {{ t('blog.readingTime', { minutes: readingMinutes }) }}
        </span>
        <div v-if="article.tags && article.tags.length > 1" class="flex gap-1.5">
          <span
            v-for="tag in article.tags.slice(1, 3)"
            :key="tag"
            class="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 font-medium border border-gray-200/50 dark:border-gray-700/30"
          >
            {{ tag }}
          </span>
          <span
            v-if="article.tags.length > 3"
            class="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800/80 text-gray-500 font-medium border border-gray-200/50 dark:border-gray-700/30"
          >
            +{{ article.tags.length - 3 }}
          </span>
        </div>
      </div>
    </div>

    <!-- SEO + a11y full-card link (D-02 tags non-cliquables → safe) -->
    <NuxtLink
      :to="localePath(`/blog/${slug}`)"
      class="absolute inset-0 z-10"
      :aria-label="`${article.title} - ${formattedDate}`"
      itemprop="url"
    />
  </article>

  <!-- Variant compact (prev/next) — D-10 pas d'image, D-09 label + icon -->
  <article
    v-else
    class="group relative rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5 flex flex-col gap-2"
    :class="direction === 'next' ? 'items-end text-right' : 'items-start text-left'"
  >
    <div
      class="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium"
    >
      <UIcon
        v-if="direction === 'prev'"
        :name="directionIcon"
        class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-brand-500"
      />
      <span>{{ directionLabel }}</span>
      <UIcon
        v-if="direction === 'next'"
        :name="directionIcon"
        class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-500"
      />
    </div>
    <h3
      class="text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors"
    >
      {{ article.title }}
    </h3>
    <time
      class="text-xs font-mono text-gray-400 dark:text-gray-500"
      :datetime="article.date"
    >
      {{ formattedDate }}
    </time>
    <NuxtLink
      :to="localePath(`/blog/${slug}`)"
      class="absolute inset-0 z-10"
      :aria-label="
        t(direction === 'prev' ? 'a11y.blogPrev' : 'a11y.blogNext', { title: article.title })
      "
    />
  </article>
</template>
