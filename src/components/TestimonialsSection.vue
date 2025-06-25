<template>
  <section class="testimonials-section">
    <div class="container">
      <!-- Header -->
      <div class="testimonials-header">
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>

        <!-- Stats -->
        <TestimonialsStats :stats="stats" :labels="statsLabels" />
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <TestimonialCard v-for="(testimonial, index) in testimonials" :key="index" :testimonial="testimonial"
          :class="{ 'featured': testimonial.featured }" />
      </div>

      <!-- CTA -->
      <TestimonialsCTA :title="ctaTitle" :subtitle="ctaSubtitle" :text="ctaText" :link="ctaLink"
        :reviews-link="reviewsLink" :reviews-text="reviewsText" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TestimonialsStats from '@/components/testimonials/TestimonialsStats.vue'
import TestimonialCard from '@/components/testimonials/TestimonialCard.vue'
import TestimonialsCTA from '@/components/testimonials/TestimonialsCTA.vue'

interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  content: string
  date: string
  platform: string
  featured?: boolean
  project_type: string
  results?: string[]
}

interface Stats {
  totalReviews: number
  averageRating: number
  projectsCompleted: number
}

interface StatsLabels {
  clients: string
  rating: string
  projects: string
}

interface Props {
  title: string
  subtitle: string
  testimonials: Testimonial[]
  stats: Stats
  statsLabels: StatsLabels
  ctaTitle: string
  ctaSubtitle: string
  ctaText: string
  ctaLink: string
  reviewsLink: string
  reviewsText: string
}

defineProps<Props>()
</script>

<style scoped>
@import '@/components/styles/TestimonialsSection.css';
</style>
