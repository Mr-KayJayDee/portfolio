<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-16 pb-12 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-4xl mx-auto text-center">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Contact</span>
        <h1 class="text-4xl sm:text-5xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
          {{ t('contact.title') }}
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-10">
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-500 dark:text-brand-400">24-48h</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('contact.stats.responseTime') }}</div>
          </div>
          <div class="w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-500 dark:text-brand-400">100%</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('contact.stats.satisfaction') }}</div>
          </div>
          <div class="w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-500 dark:text-brand-400">Remote</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('contact.stats.collaboration') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Column Layout -->
    <section class="py-16 md:py-20 px-4">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        <!-- Left: Contact Form (wider) -->
        <div class="lg:col-span-3">
          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ t('contact.form.title') }}</h2>
            <ContactForm />
          </div>
        </div>

        <!-- Right: Contact Info + Social -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <!-- Contact Info -->
          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{{ t('contact.quickContact') }}</h2>
            <div class="flex flex-col gap-5">
              <a
                :href="`mailto:${siteConfig.contact.email}`"
                class="flex items-center gap-4 group"
              >
                <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0 transition-colors group-hover:bg-brand-500/20">
                  <UIcon name="i-lucide-mail" class="text-brand-600 dark:text-brand-400" />
                </div>
                <span class="text-gray-600 dark:text-gray-300 group-hover:text-brand-500 transition-colors">{{ siteConfig.contact.email }}</span>
              </a>
              <a
                :href="`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`"
                class="flex items-center gap-4 group"
              >
                <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0 transition-colors group-hover:bg-brand-500/20">
                  <UIcon name="i-lucide-phone" class="text-brand-600 dark:text-brand-400" />
                </div>
                <span class="text-gray-600 dark:text-gray-300 group-hover:text-brand-500 transition-colors">{{ siteConfig.contact.phone }}</span>
              </a>
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-map-pin" class="text-brand-600 dark:text-brand-400" />
                </div>
                <span class="text-gray-600 dark:text-gray-300">{{ siteConfig.contact.location }}</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{{ t('contact.findMeOn') }}</h2>
            <div class="flex flex-col gap-3">
              <a
                v-for="social in siteConfig.social.filter(s => s.icon !== 'i-lucide-mail')"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 transition-colors">
                  <UIcon :name="social.icon" class="text-gray-500 dark:text-gray-400 group-hover:text-brand-500 transition-colors" />
                </div>
                <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-brand-500 transition-colors">{{ social.name }}</span>
                <UIcon name="i-lucide-external-link" class="text-xs text-gray-400 dark:text-gray-600 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Info Cards -->
    <section class="py-16 md:py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Info</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('contact.faq.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            {{ t('contact.faq.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center group hover:border-brand-500/30 transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-500/20 transition-colors">
              <UIcon name="i-lucide-clock" class="text-2xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('contact.faq.responseTime.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('contact.faq.responseTime.description') }}</p>
          </div>

          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center group hover:border-brand-500/30 transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-500/20 transition-colors">
              <UIcon name="i-lucide-building" class="text-2xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('contact.faq.projectTypes.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('contact.faq.projectTypes.description') }}</p>
          </div>

          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center group hover:border-brand-500/30 transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-500/20 transition-colors">
              <UIcon name="i-lucide-users" class="text-2xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('contact.faq.collaboration.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('contact.faq.collaboration.description') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
