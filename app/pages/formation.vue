<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.formation.title'),
  description: () => t('seo.formation.description'),
  ogTitle: () => t('seo.formation.title'),
  ogDescription: () => t('seo.formation.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-2xl font-bold">{{ t('nav.formation') }}</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-4">Phase 3 content placeholder</p>
  </div>
</template>
