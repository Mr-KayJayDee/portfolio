<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: 'Killian Dalcin',
            url: 'https://killiandalcin.fr',
            jobTitle: 'Developpeur Full Stack Freelance',
            email: 'contact@killiandalcin.fr',
            sameAs: [
              'https://linkedin.com/in/killian-dal-cin',
              'https://www.fiverr.com/users/mr_kayjaydee',
              'https://gitea.kamisama.ovh/kayjaydee',
            ],
          },
          {
            '@type': 'ProfessionalService',
            name: 'Killian Dalcin - Developpeur Full Stack',
            url: 'https://killiandalcin.fr',
            logo: 'https://killiandalcin.fr/images/logo.webp',
            priceRange: '$$$',
            areaServed: 'Worldwide',
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-2xl font-bold">{{ t('nav.home') }}</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-4">Phase 3 content placeholder</p>
  </div>
</template>
