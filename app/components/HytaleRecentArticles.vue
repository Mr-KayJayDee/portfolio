<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const isFr = computed(() => locale.value === 'fr')

// Query bilingue avec branches littérales (Phase 5 Pitfall D-03 — queryCollection(variable) non analysé par Vite extractor)
// Pas de .limit(2) au SQL et pas de .where('tags','LIKE',...) : l'opérateur LIKE sur champ JSON array SQLite
// n'est pas fiable (D-11). On applique un filtre JS post-query + slice(0,2).
const { data } = await useAsyncData(
  `hytale-recent-${locale.value}`,
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

// Filtre JS car LIKE SQLite unreliable sur tags[] — D-11
// Array.isArray guard pour éviter TypeError si frontmatter cassé passe le schema — T-08-01
const articles = computed(() => {
  const all = data.value ?? []
  return all.filter((a) => Array.isArray(a.tags) && a.tags.includes('hytale')).slice(0, 2)
})
</script>

<template>
  <section
    v-if="articles.length"
    class="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">
          // recent-articles
        </span>
        <h2
          class="text-3xl sm:text-4xl font-bold mt-3 mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent"
        >
          {{ t('hytale.recentArticles.title') }}
        </h2>
        <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {{ t('hytale.recentArticles.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mt-8">
        <BlogCard
          v-for="article in articles"
          :key="article.path"
          :article="article"
          variant="compact"
        />
      </div>

      <div class="text-center mt-8">
        <NuxtLink
          :to="localePath('/blog')"
          class="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium transition-colors"
        >
          {{ t('hytale.recentArticles.viewAll') }}
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
