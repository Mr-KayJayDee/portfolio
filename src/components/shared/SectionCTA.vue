<template>
  <div class="section-cta">
    <div class="cta-content">
      <h3 class="cta-question">{{ question }}</h3>
      <p class="cta-description">{{ description }}</p>

      <CTAButtons layout="columns">
        <RouterLink :to="primaryLink" class="btn btn-primary btn-lg">
          {{ primaryText }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
            </path>
          </svg>
        </RouterLink>

        <RouterLink v-if="secondaryText && secondaryLink" :to="secondaryLink" class="btn btn-secondary btn-lg">
          {{ secondaryText }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6">
            </path>
          </svg>
        </RouterLink>

        <a v-if="externalText && externalLink" :href="externalLink" class="btn btn-secondary btn-lg" target="_blank"
          rel="noopener">
          {{ externalText }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14">
            </path>
          </svg>
        </a>
      </CTAButtons>
    </div>
  </div>
</template>

<script setup lang="ts">
import CTAButtons from '@/components/shared/CTAButtons.vue'

interface Props {
  question: string
  description: string
  primaryText: string
  primaryLink: string
  secondaryText?: string
  secondaryLink?: string
  externalText?: string
  externalLink?: string
}

defineProps<Props>()
</script>

<style scoped>
@import '@/components/styles/SectionCTA.css';
</style>
