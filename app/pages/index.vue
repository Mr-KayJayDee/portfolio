<script setup lang="ts">
import { homeFAQs } from '~/data/faq'
import { siteConfig } from '~/data/site'

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
            name: "Killian' DAL-CIN",
            url: siteConfig.url,
            jobTitle: siteConfig.jobTitle,
            email: siteConfig.contact.email,
            sameAs: [
              'https://linkedin.com/in/killian-dal-cin',
              'https://www.fiverr.com/users/mr_kayjaydee',
              'https://gitea.kamisama.ovh/kayjaydee',
            ],
          },
          {
            '@type': 'ProfessionalService',
            name: `Killian' DAL-CIN - ${siteConfig.jobTitle}`,
            url: siteConfig.url,
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
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Featured Projects Section -->
    <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
      <FeaturedProjectsSection />
    </div>

    <!-- Services Section -->
    <ServicesSection />

    <!-- Testimonials Section -->
    <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
      <TestimonialsSection featured />
    </div>

    <!-- FAQ Section -->
    <FAQSection :faqs="homeFAQs" :title="t('faq.title')" :subtitle="t('faq.subtitle')" />

    <!-- CTA Section -->
    <CTASection />
  </div>
</template>
