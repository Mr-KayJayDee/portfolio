<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const isFr = computed(() => locale.value === 'fr')

// Query bilingue avec branches littérales (Phase 5 gotcha — Pattern 1 RESEARCH)
// Option watch sur locale pour re-fetch au switch FR/EN (Pitfall 3)
const { data: articles } = await useAsyncData(
  `blog-list-${locale.value}`,
  () =>
    isFr.value
      ? queryCollection('blog_fr')
          .where('draft', '=', false)
          .order('date', 'DESC')
          .all()
      : queryCollection('blog_en')
          .where('draft', '=', false)
          .order('date', 'DESC')
          .all(),
  { watch: [locale] },
)

// Stats computed (UI-SPEC §Hero contract exact — 3 items)
const totalArticles = computed(() => articles.value?.length ?? 0)

const uniqueTags = computed(() => {
  const set = new Set<string>()
  for (const a of articles.value ?? []) {
    for (const tag of a.tags ?? []) set.add(tag)
  }
  return set.size
})

const totalLanguages = 2 // FR + EN — valeur fixe (UI-SPEC)

// SEO minimal Phase 6 — Phase 7 enrichira avec JSON-LD + og:image par article
useSeoMeta({
  title: () => t('blog.title'),
  description: () => t('blog.subtitle'),
  ogTitle: () => t('blog.title'),
  ogDescription: () => t('blog.subtitle'),
  ogType: 'website',
})
</script>

<template>
  <div>
    <!-- Hero (pattern /projects.vue lignes 56-83) -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// blog</span>
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent"
        >
          {{ t('blog.title') }}
        </h1>
        <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {{ t('blog.subtitle') }}
        </p>

        <!-- Stats: articles / tags / languages (3 items + 2 dividers) -->
        <div class="flex justify-center gap-8 sm:gap-12 mt-12">
          <div class="text-center">
            <p
              class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent"
            >
              {{ totalArticles }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {{ t('blog.stats.articles') }}
            </p>
          </div>
          <div
            class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          />
          <div class="text-center">
            <p
              class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent"
            >
              {{ uniqueTags }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {{ t('blog.stats.tags') }}
            </p>
          </div>
          <div
            class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          />
          <div class="text-center">
            <p
              class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent"
            >
              {{ totalLanguages }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {{ t('blog.stats.languages') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Grid or Empty state -->
    <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Grille responsive 1/2/3 cols (D-01) -->
        <div
          v-if="articles && articles.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          <BlogCard
            v-for="article in articles"
            :key="article.path"
            :article="article"
            variant="default"
          />
        </div>

        <!-- Empty state (D-16 + UI-SPEC §Empty state copywriting) -->
        <div v-else class="text-center py-32">
          <div
            class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/30 flex items-center justify-center"
          >
            <UIcon name="i-lucide-book-open" class="text-2xl text-gray-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ t('blog.emptyState.title') }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            {{ t('blog.emptyState.description') }}
          </p>
          <UButton
            color="primary"
            variant="solid"
            size="md"
            icon="i-lucide-mail"
            :to="localePath('/contact')"
          >
            {{ t('blog.emptyState.cta') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
