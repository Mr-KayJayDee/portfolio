<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { homeFAQs } from '~/data/faq'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.fiverr.title'),
  description: () => t('seo.fiverr.description'),
  ogTitle: () => t('seo.fiverr.title'),
  ogDescription: () => t('seo.fiverr.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})

const services = computed(() => siteConfig.fiverr.services)
const availableServices = computed(() => services.value.filter((s) => s.url !== '#'))

const heroStats = computed(() => [
  {
    number: availableServices.value.length,
    label: t('fiverr.services.orderNow'),
  },
  {
    number: '5',
    label: t('fiverr.stats.rating'),
  },
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-6">
          {{ t('fiverr.title') }}
        </h1>
        <p class="text-xl text-muted mb-8">
          {{ t('fiverr.subtitle') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8 mb-8">
          <div v-for="stat in heroStats" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-primary">{{ stat.number }}</div>
            <div class="text-sm text-muted">{{ stat.label }}</div>
          </div>
        </div>

        <UButton
          :to="siteConfig.fiverr.profileUrl"
          target="_blank"
          external
          size="lg"
          trailing-icon="i-lucide-external-link"
        >
          {{ t('fiverr.profileCta') }}
        </UButton>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">{{ t('fiverr.services.title') }}</h2>
          <p class="text-lg text-muted">{{ t('fiverr.services.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="service in services" :key="service.id">
            <!-- Service Image -->
            <NuxtImg
              :src="service.image"
              :alt="t(`fiverr.serviceData.${service.id}.title`)"
              class="w-full h-48 object-cover rounded-lg mb-4"
              loading="lazy"
            />

            <!-- Price & Status Badges -->
            <div class="flex items-center gap-2 mb-3">
              <UBadge color="primary" variant="subtle">
                {{ t('fiverr.pricing.startingAt') }} {{ service.price }}
              </UBadge>
              <UBadge
                :color="service.url !== '#' ? 'success' : 'warning'"
                variant="subtle"
              >
                {{ service.url !== '#' ? t('fiverr.services.available') : t('fiverr.services.comingSoon') }}
              </UBadge>
            </div>

            <!-- Title & Description -->
            <h3 class="text-xl font-bold mb-2">
              {{ t(`fiverr.serviceData.${service.id}.title`) }}
            </h3>
            <p class="text-muted mb-4">
              {{ t(`fiverr.serviceData.${service.id}.description`) }}
            </p>

            <!-- Action Button -->
            <UButton
              v-if="service.url !== '#'"
              :to="service.url"
              target="_blank"
              external
              size="sm"
              trailing-icon="i-lucide-external-link"
            >
              {{ t('fiverr.services.orderNow') }}
            </UButton>
            <UButton
              v-else
              size="sm"
              variant="outline"
              disabled
            >
              {{ t('fiverr.services.comingSoon') }}
            </UButton>
          </UCard>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <FAQSection
      :faqs="homeFAQs"
      :title="t('fiverr.faq.title')"
      :subtitle="t('fiverr.faq.subtitle')"
    />

    <!-- CTA Section -->
    <section class="py-16 px-4 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">{{ t('fiverr.cta.title') }}</h2>
        <p class="text-lg text-muted mb-8">{{ t('fiverr.cta.subtitle') }}</p>
        <UButton
          :to="siteConfig.fiverr.profileUrl"
          target="_blank"
          external
          size="lg"
          trailing-icon="i-lucide-external-link"
        >
          {{ t('fiverr.cta.button') }}
        </UButton>
      </div>
    </section>
  </div>
</template>
