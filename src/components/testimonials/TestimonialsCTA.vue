<template>
  <div class="testimonials-cta">
    <h3 class="cta-title">{{ title }}</h3>
    <p class="cta-subtitle">{{ subtitle }}</p>
    <CTAButtons layout="row">
      <RouterLink :to="link" class="btn btn-primary btn-lg">
        {{ text }}
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </RouterLink>
      <a :href="reviewsLink" class="btn btn-secondary btn-lg" target="_blank" rel="noopener">
        {{ reviewsText }}
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </CTAButtons>
  </div>
</template>

<script setup lang="ts">
import CTAButtons from '@/components/shared/CTAButtons.vue'

interface Props {
  title: string
  subtitle: string
  text: string
  link: string
  reviewsLink: string
  reviewsText: string
}

defineProps<Props>()
</script>

<style scoped>
@import '@/components/styles/TestimonialsCTA.css';
</style>
