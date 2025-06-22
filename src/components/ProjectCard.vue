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
  <article class="card group">
    <!-- Image -->
    <div class="relative overflow-hidden" style="aspect-ratio: 16/9;">
      <img :src="imageUrl" :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy">
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 left-4 right-4">
          <div v-if="project.buttons && project.buttons.length > 0" class="flex gap-2">
            <a v-for="button in project.buttons" :key="button.title" :href="button.link" target="_blank"
              rel="noopener noreferrer" class="btn btn-primary btn-sm" @click.stop>
              {{ t(`projects.buttons.${button.title.toLowerCase().replace(/\s+/g, '')}`, button.title) }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="card-body">
      <!-- Category & Date -->
      <div class="flex items-center justify-between mb-md">
        <span v-if="project.category" class="badge badge-primary">
          {{ translatedCategory }}
        </span>
        <span v-if="project.date" class="text-sm text-secondary">
          {{ project.date }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold mb-md group-hover:text-primary transition-colors">
        {{ translatedTitle }}
      </h3>

      <!-- Description -->
      <p class="text-secondary mb-lg line-clamp-3">
        {{ translatedDescription }}
      </p>

      <!-- Technologies -->
      <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-2 mb-lg">
        <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="badge badge-secondary text-xs">
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="badge badge-secondary text-xs">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>

      <!-- Action -->
      <div class="flex items-center justify-between">
        <RouterLink :to="`/project/${project.id}`" class="btn btn-secondary btn-sm">
          {{ t('projects.buttons.viewProject') }}
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom utilities */
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.object-cover {
  object-fit: cover;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bottom-4 {
  bottom: 1rem;
}

.left-4 {
  left: 1rem;
}

.right-4 {
  right: 1rem;
}

.text-xs {
  font-size: var(--font-size-xs);
}

.text-sm {
  font-size: var(--font-size-sm);
}

.text-xl {
  font-size: var(--font-size-xl);
}

.font-bold {
  font-weight: var(--font-weight-bold);
}

.font-medium {
  font-weight: var(--font-weight-medium);
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-warning {
  color: var(--color-warning);
}

.group-hover\:text-primary {
  transition: color var(--transition-fast);
}

.group:hover .group-hover\:text-primary {
  color: var(--color-primary);
}

.transition-colors {
  transition: color var(--transition-fast);
}

.transition-transform {
  transition: transform var(--transition-normal);
}

.transition-opacity {
  transition: opacity var(--transition-normal);
}

.duration-300 {
  transition-duration: 300ms;
}

.group-hover\:scale-110 {
  transition: transform var(--transition-normal);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.opacity-0 {
  opacity: 0;
}

.group-hover\:opacity-100 {
  transition: opacity var(--transition-normal);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.overflow-hidden {
  overflow: hidden;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
