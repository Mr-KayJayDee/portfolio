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
    <section class="pt-16 pb-16 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-4xl mx-auto text-center">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Fiverr</span>
        <h1 class="text-4xl sm:text-5xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
          {{ t('fiverr.title') }}
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {{ t('fiverr.subtitle') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-10 mb-10">
          <div v-for="stat in heroStats" :key="stat.label" class="text-center">
            <div class="text-4xl font-extrabold text-brand-500 dark:text-brand-400">{{ stat.number }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ stat.label }}</div>
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
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Services</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('fiverr.services.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-3">{{ t('fiverr.services.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1"
          >
            <!-- Service Image -->
            <div class="relative overflow-hidden">
              <NuxtImg
                :src="service.image"
                :alt="t(`fiverr.serviceData.${service.id}.title`)"
                class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <!-- Price badge overlay -->
              <div class="absolute bottom-3 left-3">
                <span class="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-sm font-bold shadow-lg">
                  {{ t('fiverr.pricing.startingAt') }} {{ service.price }}
                </span>
              </div>
              <!-- Status badge -->
              <div class="absolute top-3 right-3">
                <span
                  :class="service.url !== '#'
                    ? 'bg-green-500/90 text-white'
                    : 'bg-yellow-500/90 text-white'"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg"
                >
                  {{ service.url !== '#' ? t('fiverr.services.available') : t('fiverr.services.comingSoon') }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                {{ t(`fiverr.serviceData.${service.id}.title`) }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
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
    <div class="bg-gray-50 dark:bg-gray-900/30">
      <FAQSection
        :faqs="homeFAQs"
        :title="t('fiverr.faq.title')"
        :subtitle="t('fiverr.faq.subtitle')"
      />
    </div>

    <!-- CTA Section -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" aria-hidden="true" />
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" aria-hidden="true" />

          <div class="relative z-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ t('fiverr.cta.title') }}</h2>
            <p class="text-lg text-white/80 mb-10 max-w-2xl mx-auto">{{ t('fiverr.cta.subtitle') }}</p>
            <UButton
              :to="siteConfig.fiverr.profileUrl"
              target="_blank"
              external
              size="xl"
              color="white"
              trailing-icon="i-lucide-external-link"
              class="font-semibold"
            >
              {{ t('fiverr.cta.button') }}
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
