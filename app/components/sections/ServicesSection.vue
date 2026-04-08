<script setup lang="ts">
const { t } = useI18n()

const services = computed(() => [
  {
    icon: 'i-lucide-monitor',
    title: t('home.services.webDev.title'),
    description: t('home.services.webDev.description'),
  },
  {
    icon: 'i-lucide-smartphone',
    title: t('home.services.mobileApps.title'),
    description: t('home.services.mobileApps.description'),
  },
  {
    icon: 'i-lucide-zap',
    title: t('home.services.optimization.title'),
    description: t('home.services.optimization.description'),
  },
  {
    icon: 'i-lucide-settings',
    title: t('home.services.maintenance.title'),
    description: t('home.services.maintenance.description'),
  },
])
</script>

<template>
  <section class="py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-900/50 rounded-3xl mx-2 md:mx-0">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-14">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Services</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('home.services.title') }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">{{ t('home.services.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-0.5"
        >
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-500/20">
            <UIcon :name="service.icon" class="text-brand-600 dark:text-brand-400 text-xl" />
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ service.title }}</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
