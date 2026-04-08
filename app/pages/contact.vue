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
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// contact</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
          {{ t('contact.title') }}
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {{ t('contact.subtitle') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8 sm:gap-12">
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">24-48h</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('contact.stats.responseTime') }}</div>
          </div>
          <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent hidden sm:block" />
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">100%</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('contact.stats.satisfaction') }}</div>
          </div>
          <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent hidden sm:block" />
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">Remote</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('contact.stats.collaboration') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Column Layout -->
    <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <!-- Left: Contact Form (wider) -->
        <div class="lg:col-span-3">
          <div class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-1 h-6 rounded-full bg-brand-500" />
              {{ t('contact.form.title') }}
            </h2>
            <ContactForm />
          </div>
        </div>

        <!-- Right: Contact Info + Social -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <!-- Contact Info -->
          <div class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-1 h-5 rounded-full bg-brand-500" />
              {{ t('contact.quickContact') }}
            </h2>
            <div class="flex flex-col gap-4">
              <a
                :href="`mailto:${siteConfig.contact.email}`"
                class="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-brand-500/20 hover:bg-brand-500/5 transition-all duration-200 group"
              >
                <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
                  <UIcon name="i-lucide-mail" class="text-brand-600 dark:text-brand-400" />
                </div>
                <span class="text-gray-600 dark:text-gray-300 group-hover:text-brand-500 transition-colors font-medium">{{ siteConfig.contact.email }}</span>
              </a>
              <div class="flex items-center gap-4 p-3">
                <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-map-pin" class="text-brand-600 dark:text-brand-400" />
                </div>
                <span class="text-gray-600 dark:text-gray-300 font-medium">{{ siteConfig.contact.location }}</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-1 h-5 rounded-full bg-brand-500" />
              {{ t('contact.findMeOn') }}
            </h2>
            <div class="flex flex-col gap-2">
              <a
                v-for="social in siteConfig.social.filter(s => s.icon !== 'i-lucide-mail')"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-brand-500/20 hover:bg-brand-500/5 transition-all duration-200 group"
              >
                <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/30 flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 group-hover:border-brand-500/20 transition-all duration-300">
                  <UIcon :name="social.icon" class="text-gray-500 dark:text-gray-400 group-hover:text-brand-500 transition-colors" />
                </div>
                <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-brand-500 transition-colors">{{ social.name }}</span>
                <UIcon name="i-lucide-external-link" class="text-xs text-gray-400 dark:text-gray-600 ml-auto group-hover:text-brand-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Info Cards -->
    <section class="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// info</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('contact.faq.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            {{ t('contact.faq.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
              <UIcon name="i-lucide-clock" class="text-2xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{{ t('contact.faq.responseTime.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('contact.faq.responseTime.description') }}</p>
          </div>

          <div class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
              <UIcon name="i-lucide-building" class="text-2xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{{ t('contact.faq.projectTypes.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('contact.faq.projectTypes.description') }}</p>
          </div>

          <div class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
              <UIcon name="i-lucide-users" class="text-2xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{{ t('contact.faq.collaboration.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ t('contact.faq.collaboration.description') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
