<template>
  <section class="fiverr-hero">
    <div class="container">
      <div class="hero-content text-center">
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-subtitle">{{ subtitle }}</p>

        <!-- Stats -->
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="hero-cta">
          <a :href="ctaUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
            {{ ctaText }}
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  number: string | number
  label: string
}

interface Props {
  title: string
  subtitle: string
  stats: Stat[]
  ctaUrl: string
  ctaText: string
}

defineProps<Props>()
</script>

<style scoped>
@import './styles/FiverrHero.css';
</style>
