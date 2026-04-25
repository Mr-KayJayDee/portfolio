<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.hytale.title'),
  description: () => t('seo.hytale.description'),
  ogTitle: () => t('seo.hytale.title'),
  ogDescription: () => t('seo.hytale.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogType: 'website',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Hytale Plugin Development',
      provider: {
        '@type': 'Person',
        name: "Killian' DAL-CIN",
        jobTitle: 'Hytale Plugin Developer',
      },
    }),
  }],
})
</script>

<template>
  <div>
    <HytaleHeroSection />
    <HytaleServicesSection />
    <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
      <HytaleDemoGrid />
    </div>
    <HytalePricingSection />
    <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
      <TestimonialsSection />
    </div>
    <HytaleRecentArticles />
  </div>
</template>
