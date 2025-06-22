<script setup lang="ts">
import { computed } from 'vue'
import { type Project } from '@/types'
import { useAssets } from '@/composables/useAssets'
import { useI18n } from '@/composables/useI18n'

interface Props {
  project: Project
}

const props = defineProps<Props>()
const { getImageUrl } = useAssets()
const { t } = useI18n()

// Get the actual image URL
const imageUrl = computed(() => {
  return getImageUrl(props.project.image)
})

// Get translated project data
const translatedTitle = computed(() => {
  return t(`projectData.${props.project.id}.title`, props.project.title)
})

const translatedDescription = computed(() => {
  return t(`projectData.${props.project.id}.description`, props.project.description)
})

const translatedCategory = computed(() => {
  if (!props.project.category) return ''
  const categoryKey = props.project.category.replace(/\s+/g, '').toLowerCase()
  return t(`projects.categories.${categoryKey}`, props.project.category)
})
</script>

<template>
  <article class="card group" itemscope itemtype="https://schema.org/CreativeWork">
    <!-- Image -->
    <div class="project-image">
      <img :src="imageUrl" :alt="`${translatedTitle} - ${translatedDescription.slice(0, 60)}...`" loading="lazy"
        width="400" height="300" itemprop="image">
    </div>

    <!-- Content -->
    <div class="card-body">
      <!-- Category & Date -->
      <div class="project-meta">
        <span v-if="project.category" class="badge badge-primary" itemprop="genre">
          {{ translatedCategory }}
        </span>
        <time v-if="project.date" class="text-sm text-secondary" :datetime="project.date" itemprop="dateCreated">
          {{ project.date }}
        </time>
      </div>

      <!-- Title -->
      <h3 class="project-title" itemprop="name">
        {{ translatedTitle }}
      </h3>

      <!-- Description -->
      <p class="project-description" itemprop="description">
        {{ translatedDescription }}
      </p>

      <!-- Technologies -->
      <div v-if="project.technologies && project.technologies.length > 0" class="project-technologies"
        itemprop="keywords">
        <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="badge badge-secondary text-xs">
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="badge badge-secondary text-xs">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>

      <!-- Action -->
      <div class="project-actions">
        <RouterLink :to="`/project/${project.id}`" class="btn btn-secondary btn-sm"
          :aria-label="`View details about ${translatedTitle} project`" itemprop="url">
          {{ t('projects.buttons.viewProject') }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
@import './styles/ProjectCard.css';
</style>
