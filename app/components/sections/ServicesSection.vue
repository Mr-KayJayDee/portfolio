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
  <section class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.services.title') }}</h2>
        <p class="text-lg text-muted max-w-2xl mx-auto">{{ t('home.services.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard v-for="(service, index) in services" :key="index">
          <div class="flex items-start gap-4">
            <UIcon :name="service.icon" class="text-primary text-2xl shrink-0 mt-1" />
            <div>
              <h3 class="text-xl font-bold mb-2">{{ service.title }}</h3>
              <p class="text-muted">{{ service.description }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
