<script setup lang="ts">
const { t } = useI18n()

const services = [
  { id: 'plugin', icon: 'i-lucide-puzzle' },
  { id: 'config', icon: 'i-lucide-settings' },
  { id: 'support', icon: 'i-lucide-shield-check' },
]
</script>

<template>
  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">{{ t('hytale.services.label') }}</span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('hytale.services.title') }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">{{ t('hytale.services.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="service in services" :key="service.id" class="hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-200">
          <div class="flex flex-col items-center text-center gap-4 p-2">
            <div class="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center">
              <UIcon :name="service.icon" class="w-6 h-6 text-brand-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t(`hytale.services.items.${service.id}.title`) }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ t(`hytale.services.items.${service.id}.description`) }}</p>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
