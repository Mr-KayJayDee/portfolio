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
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// fiverr</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
          {{ t('fiverr.title') }}
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {{ t('fiverr.subtitle') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
          <div v-for="stat in heroStats" :key="stat.label" class="text-center">
            <div class="text-4xl sm:text-5xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ stat.number }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ stat.label }}</div>
          </div>
        </div>

        <UButton
          :to="siteConfig.fiverr.profileUrl"
          target="_blank"
          external
          size="xl"
          trailing-icon="i-lucide-external-link"
          class="font-semibold"
        >
          {{ t('fiverr.profileCta') }}
        </UButton>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// services</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('fiverr.services.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">{{ t('fiverr.services.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <div
            v-for="service in services"
            :key="service.id"
            class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5"
          >
            <!-- Service Image -->
            <div class="relative overflow-hidden">
              <NuxtImg
                :src="service.image"
                :alt="t(`fiverr.serviceData.${service.id}.title`)"
                class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <!-- Price badge overlay -->
              <div class="absolute bottom-3 left-3">
                <span class="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-sm font-bold shadow-lg backdrop-blur-sm">
                  {{ t('fiverr.pricing.startingAt') }} {{ service.price }}
                </span>
              </div>
              <!-- Status badge -->
              <div class="absolute top-3 right-3">
                <span
                  :class="service.url !== '#'
                    ? 'bg-green-500/90 text-white backdrop-blur-sm'
                    : 'bg-yellow-500/90 text-white backdrop-blur-sm'"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg"
                >
                  {{ service.url !== '#' ? t('fiverr.services.available') : t('fiverr.services.comingSoon') }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 sm:p-7">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {{ t(`fiverr.serviceData.${service.id}.title`) }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                {{ t(`fiverr.serviceData.${service.id}.description`) }}
              </p>

              <!-- Action Button -->
              <UButton
                v-if="service.url !== '#'"
                :to="service.url"
                target="_blank"
                external
                trailing-icon="i-lucide-external-link"
                class="font-semibold"
              >
                {{ t('fiverr.services.orderNow') }}
              </UButton>
              <UButton
                v-else
                variant="outline"
                disabled
                class="font-semibold"
              >
                {{ t('fiverr.services.comingSoon') }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
      <FAQSection
        :faqs="homeFAQs"
        :title="t('fiverr.faq.title')"
        :subtitle="t('fiverr.faq.subtitle')"
      />
    </div>

    <!-- CTA Section -->
    <CTASection
      :title="t('fiverr.cta.title')"
      :subtitle="t('fiverr.cta.subtitle')"
      :primary-text="t('fiverr.cta.button')"
      :primary-to="siteConfig.fiverr.profileUrl"
      :secondary-text="t('fiverr.profileCta')"
      secondary-to="/contact"
      external
    />
  </div>
</template>
