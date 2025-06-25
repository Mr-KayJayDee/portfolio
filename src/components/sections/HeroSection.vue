<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content animate-fade-in-up">
        <h1 class="hero-title">
          {{ t('home.title') }}
        </h1>
        <p class="hero-subtitle">
          {{ t('home.subtitle') }}
        </p>
        <CTAButtons layout="columns">
          <RouterLink to="/projects" class="btn btn-primary btn-lg">
            {{ t('home.cta.viewProjects') }}
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6">
              </path>
            </svg>
          </RouterLink>
          <RouterLink to="/fiverr" class="btn btn-secondary btn-lg">
            {{ t('nav.fiverr') }}
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-secondary btn-lg">
            {{ t('home.cta.contactMe') }}
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
              </path>
            </svg>
          </RouterLink>
        </CTAButtons>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import CTAButtons from '@/components/shared/CTAButtons.vue'

const { t } = useI18n()
</script>
