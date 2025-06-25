<template>
  <div class="testimonials-stats">
    <div class="stat-item">
      <div class="stat-number">{{ stats.totalReviews }}+</div>
      <div class="stat-label">{{ labels.clients }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.averageRating }}/5</div>
      <div class="stat-label">{{ labels.rating }}</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.projectsCompleted }}+</div>
      <div class="stat-label">{{ labels.projects }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stats {
  totalReviews: number
  averageRating: number
  projectsCompleted: number
}

interface Labels {
  clients: string
  rating: string
  projects: string
}

interface Props {
  stats: Stats
  labels: Labels
}

defineProps<Props>()
</script>

<style scoped>
@import '@/components/styles/TestimonialsStats.css';
</style>
