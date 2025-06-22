<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useSeo } from '@/composables/useSeo'
import { useSiteConfig } from '@/composables/useSiteConfig'
import { useAssets } from '@/composables/useAssets'
import FiverrHero from '@/components/FiverrHero.vue'
import FiverrServiceCard from '@/components/FiverrServiceCard.vue'
import FiverrCta from '@/components/FiverrCta.vue'
import en from '@/locales/en'
import fr from '@/locales/fr'

const { t, locale } = useI18n()
const { siteConfig } = useSiteConfig()
const { getImageUrl } = useAssets()

// SEO
useSeo({
  title: t('seo.fiverr.title'),
  description: t('seo.fiverr.description'),
  keywords: 'fiverr services, discord bot development, minecraft plugin development, telegram bot creation, web development services, freelance developer, custom bot development, fiverr gigs',
  ogImage: '/portfolio-preview.jpg',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Professional Development Services on Fiverr',
    'description': 'Custom Discord bot development, Minecraft plugins, Telegram bots, and web development services',
    'provider': {
      '@type': 'Person',
      'name': 'Killian',
      'jobTitle': 'Full Stack Developer'
    },
    'offers': siteConfig.value.fiverr.services.map(service => ({
      '@type': 'Offer',
      'name': t(`fiverr.serviceData.${service.id}.title`),
      'description': t(`fiverr.serviceData.${service.id}.description`),
      'price': service.price.replace('$', ''),
      'priceCurrency': 'USD',
      'url': service.url,
      'availability': service.url !== '#' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder'
    })),
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '5',
      'bestRating': '5',
      'worstRating': '1',
      'reviewCount': '50+'
    }
  }
})

const services = computed(() => siteConfig.value.fiverr.services)
const availableServices = computed(() => services.value.filter(s => s.url !== '#'))

// Get features from the current locale messages
const getServiceFeatures = (serviceId: string) => {
  const messages = { en, fr }
  const currentMessages = messages[locale.value as keyof typeof messages]
  const serviceData = currentMessages?.fiverr?.serviceData?.[serviceId as keyof typeof currentMessages.fiverr.serviceData]
  return serviceData?.features || []
}

// Hero data
const heroStats = computed(() => [
  {
    number: availableServices.value.length,
    label: t('fiverr.services.orderNow')
  },
  {
    number: '5⭐',
    label: t('fiverr.stats.rating')
  }
])

// Service card data
const getServiceCardProps = (service: { id: string; price: string; url: string; image: string }) => ({
  title: t(`fiverr.serviceData.${service.id}.title`),
  description: t(`fiverr.serviceData.${service.id}.description`),
  price: `${t('fiverr.pricing.startingAt')} ${service.price}`,
  url: service.url,
  imageUrl: getImageUrl(service.image),
  features: getServiceFeatures(service.id),
  featuresTitle: t('fiverr.services.features'),
  orderText: t('fiverr.services.orderNow'),
  learnMoreText: t('fiverr.services.learnMore'),
  moreFeaturesText: t('fiverr.services.moreFeatures'),
  comingSoonText: t('fiverr.services.comingSoon'),
  availableText: t('fiverr.services.available')
})
</script>

<template>
  <main class="fiverr-page">
    <!-- Hero Section -->
    <FiverrHero :title="t('fiverr.title')" :subtitle="t('fiverr.subtitle')" :stats="heroStats"
      :cta-url="siteConfig.fiverr.profileUrl" :cta-text="t('fiverr.profileCta')" />

    <!-- Services Section -->
    <section class="services-grid-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header text-center">
          <h2 class="section-title">{{ t('fiverr.services.title') }}</h2>
          <p class="section-subtitle">{{ t('fiverr.services.subtitle') }}</p>
        </div>

        <!-- Services Grid -->
        <div class="services-grid">
          <FiverrServiceCard v-for="service in services" :key="service.id" v-bind="getServiceCardProps(service)" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <FiverrCta :title="t('fiverr.cta.title')" :subtitle="t('fiverr.cta.subtitle')"
      :cta-url="siteConfig.fiverr.profileUrl" :cta-text="t('fiverr.cta.button')" />
  </main>
</template>

<style scoped>
@import './styles/FiverrPage.css';
</style>
