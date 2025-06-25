<template>
  <section class="services-section">
    <div class="container">
      <div class="text-center mb-2xl">
        <h2 class="mb-lg">{{ t('home.services.title') }}</h2>
        <p class="text-xl text-secondary max-w-2xl mx-auto">
          {{ t('home.services.subtitle') }}
        </p>
      </div>

      <div class="services-grid">
        <div v-for="(service, index) in services" :key="index" class="card animate-fade-in-up"
          :style="{ 'animation-delay': `${index * 0.1}s` }">
          <div class="card-body">
            <div class="flex items-start">
              <div class="service-icon" :style="{ background: service.color, color: 'var(--text-inverse)' }">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-md">{{ service.title }}</h3>
                <p class="text-secondary">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Services data
const services = computed(() => [
  {
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    color: 'var(--color-primary)',
    title: t('home.services.webDev.title'),
    description: t('home.services.webDev.description')
  },
  {
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'var(--color-secondary)',
    title: t('home.services.mobileApps.title'),
    description: t('home.services.mobileApps.description')
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'var(--color-success)',
    title: t('home.services.optimization.title'),
    description: t('home.services.optimization.description')
  },
  {
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    color: 'var(--color-warning)',
    title: t('home.services.maintenance.title'),
    description: t('home.services.maintenance.description')
  }
])
</script>

<style scoped>
@import '@/components/styles/ServicesSection.css';
</style>
