<script setup lang="ts">
import { computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useI18n } from '@/composables/useI18n'
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import ServiceFAQ from '@/components/ServiceFAQ.vue'
import CTASection from '@/components/sections/CTASection.vue'
import { testimonials, testimonialsStats } from '@/data/testimonials'
import frLocale from '@/locales/fr'
import enLocale from '@/locales/en'

const { t, currentLocale } = useI18n()

// Get translated FAQs using computed with direct locale access
const homeFAQs = computed(() => {
  const locale = currentLocale.value === 'fr' ? frLocale : enLocale
  const faqData = locale.faq.homeFaq

  return [
    {
      question: faqData.delivery.question,
      answer: faqData.delivery.answer,
      features: faqData.delivery.features
    },
    {
      question: faqData.maintenance.question,
      answer: faqData.maintenance.answer,
      features: faqData.maintenance.features
    },
    {
      question: faqData.companies.question,
      answer: faqData.companies.answer,
      features: faqData.companies.features
    }
  ]
})

// Enhanced SEO with structured data
useSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  keywords: 'full stack developer, vue.js developer, react developer, node.js developer, web development services, javascript developer, typescript expert, discord bot developer, freelance developer, custom software development',
  ogImage: '/portfolio-preview.webp',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Killian - Full Stack Developer Portfolio',
    'url': 'https://killiandalcin.fr',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://killiandalcin.fr/projects?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    'author': {
      '@type': 'Person',
      'name': 'Killian',
      'jobTitle': 'Full Stack Developer',
      'url': 'https://killiandalcin.fr/about',
      'sameAs': [
        'https://github.com/killian',
        'https://linkedin.com/in/killian-dev',
        'https://www.fiverr.com/users/mr_kayjaydee'
      ]
    }
  }
})
</script>

<template>
  <main class="page-enter">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Featured Projects Section -->
    <FeaturedProjectsSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Testimonials Section -->
    <TestimonialsSection :title="t('testimonials.title')" :subtitle="t('testimonials.subtitle')"
      :testimonials="testimonials" :stats="testimonialsStats"
      :stats-labels="{ clients: t('testimonials.stats.clients'), rating: t('testimonials.stats.rating'), projects: t('testimonials.stats.projects') }"
      :cta-title="t('testimonials.ctaTitle')" :cta-subtitle="t('testimonials.ctaSubtitle')"
      :cta-text="t('testimonials.ctaText')" :cta-link="'/contact'" :reviews-link="t('testimonials.reviewsLink')"
      :reviews-text="t('testimonials.reviewsText')" />

    <!-- FAQ Section -->
    <ServiceFAQ :title="t('faq.title')" :subtitle="t('faq.subtitle')" :faqs="homeFAQs" :cta-title="t('faq.ctaTitle')"
      :cta-subtitle="t('faq.ctaSubtitle')" :cta-text="t('faq.ctaText')" :cta-link="'/contact'" />

    <!-- CTA Section -->
    <CTASection />
  </main>
</template>

<style scoped>
@import './styles/HomePage.css';
</style>
