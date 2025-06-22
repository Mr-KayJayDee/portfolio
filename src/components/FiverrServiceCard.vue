<template>
  <article class="card group service-card">
    <!-- Image -->
    <div class="service-image">
      <img :src="imageUrl" :alt="title" loading="lazy">
    </div>

    <!-- Content -->
    <div class="card-body">
      <!-- Price & Status -->
      <div class="service-header">
        <span class="badge badge-primary">{{ price }}</span>
        <span :class="statusBadgeClass">{{ statusText }}</span>
      </div>

      <!-- Title -->
      <h3 class="service-title">{{ title }}</h3>

      <!-- Description -->
      <p class="service-description">{{ description }}</p>

      <!-- Features -->
      <div class="features-list">
        <div class="features-title">{{ featuresTitle }}</div>
        <ul class="features-items">
          <li v-for="(feature, index) in displayedFeatures" :key="index" class="feature-item">
            <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ feature }}
          </li>
          <li v-if="hasMoreFeatures" class="more-features">
            +{{ remainingFeaturesCount }} {{ moreFeaturesText }}
          </li>
        </ul>
      </div>

      <!-- Action -->
      <div class="service-actions">
        <a v-if="isAvailable" :href="url" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          {{ orderText }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <button v-else class="btn btn-secondary btn-sm" disabled>
          {{ learnMoreText }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  description: string
  price: string
  url: string
  imageUrl: string
  features: string[]
  featuresTitle: string
  orderText: string
  learnMoreText: string
  moreFeaturesText: string
  comingSoonText: string
  availableText: string
  maxFeatures?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxFeatures: 5
})

const isAvailable = computed(() => props.url !== '#')

const displayedFeatures = computed(() =>
  props.features.slice(0, props.maxFeatures)
)

const hasMoreFeatures = computed(() =>
  props.features.length > props.maxFeatures
)

const remainingFeaturesCount = computed(() =>
  props.features.length - props.maxFeatures
)

const statusText = computed(() =>
  isAvailable.value ? props.availableText : props.comingSoonText
)

const statusBadgeClass = computed(() =>
  isAvailable.value ? 'badge badge-success text-xs' : 'badge badge-warning text-xs'
)
</script>

<style scoped>
@import './styles/FiverrServiceCard.css';
</style>
