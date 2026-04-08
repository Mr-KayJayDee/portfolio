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
  <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Subtle background gradient -->
    <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden="true" />

    <div class="relative z-10 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// services</span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('home.services.title') }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">{{ t('home.services.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1"
        >
          <!-- Hover glow effect -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/0 to-emerald-500/0 group-hover:from-brand-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none" aria-hidden="true" />

          <div class="relative z-10">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
              <UIcon :name="service.icon" class="text-brand-600 dark:text-brand-400 text-xl" />
            </div>

            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{{ service.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
