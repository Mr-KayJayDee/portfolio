<template>
  <section class="cta-section">
    <div class="container">
      <div class="cta-content text-center">
        <h2 class="cta-title">{{ title }}</h2>
        <p class="cta-subtitle">{{ subtitle }}</p>
        <a :href="ctaUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
          {{ ctaText }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  ctaUrl: string
  ctaText: string
}

defineProps<Props>()
</script>

<style scoped>
@import './styles/FiverrCta.css';
</style>
