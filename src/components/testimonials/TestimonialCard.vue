<template>
  <div class="testimonial-card">
    <!-- Header -->
    <div class="testimonial-header">
      <div class="client-info">
        <div class="client-avatar">
          <img :src="testimonial.avatar" :alt="testimonial.name" loading="lazy" />
        </div>
        <div class="client-details">
          <h4 class="client-name">{{ testimonial.name }}</h4>
          <p class="client-role">{{ testimonial.role }}</p>
          <p class="client-company">{{ testimonial.company }}</p>
        </div>
      </div>

      <!-- Rating -->
      <div class="rating">
        <div class="stars">
          <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= testimonial.rating }">
            ⭐
          </span>
        </div>
        <span class="rating-text">{{ testimonial.rating }}/5</span>
      </div>
    </div>

    <!-- Content -->
    <div class="testimonial-content">
      <blockquote>
        {{ testimonial.content }}
      </blockquote>

      <!-- Project Info -->
      <div v-if="testimonial.project_type" class="project-info">
        <div class="project-tag">
          <span class="project-type">{{ testimonial.project_type }}</span>
        </div>
      </div>

      <!-- Results -->
      <div v-if="testimonial.results" class="results">
        <h5>{{ t('testimonials.card.results') }}</h5>
        <ul>
          <li v-for="result in testimonial.results" :key="result">
            {{ result }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div class="testimonial-footer">
      <div class="badges">
        <span v-if="testimonial.featured" class="badge featured">
          🏆 {{ t('testimonials.card.featured') }}
        </span>
        <span class="badge platform">
          {{ testimonial.platform }}
        </span>
      </div>
      <div class="testimonial-date">
        {{ formatRelativeTime(testimonial.date) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import { useDateFormat } from '@/composables/useDateFormat'

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

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()

const { t } = useI18n()
const { formatRelativeTime } = useDateFormat()
</script>

<style scoped>
@import '@/components/styles/TestimonialCard.css';
</style>
