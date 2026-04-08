<script setup lang="ts">
import type { Project } from '~~/shared/types'

interface Props {
  project: Project
}

const props = defineProps<Props>()
const { t } = useI18n()

const translatedCategory = computed(() => {
  if (!props.project.category) return ''
  const categoryKey = props.project.category.replace(/\s+/g, '').toLowerCase()
  return t(`projects.categories.${categoryKey}`, props.project.category)
})
</script>

<template>
  <article
    class="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1"
    itemscope
    itemtype="https://schema.org/CreativeWork"
  >
    <!-- Image -->
    <NuxtLink :to="`/project/${project.id}`" class="block relative overflow-hidden">
      <NuxtImg
        :src="project.image"
        :alt="`${project.title} - ${project.description.slice(0, 60)}...`"
        loading="lazy"
        format="webp"
        width="400"
        height="300"
        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        itemprop="image"
      />
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </NuxtLink>

    <!-- Content -->
    <div class="p-5 flex flex-col gap-3">
      <!-- Category & Date -->
      <div class="flex items-center justify-between">
        <UBadge v-if="project.category" color="primary" variant="subtle" itemprop="genre">
          {{ translatedCategory }}
        </UBadge>
        <time v-if="project.date" class="text-xs text-gray-400 dark:text-gray-500 font-medium" :datetime="project.date" itemprop="dateCreated">
          {{ project.date }}
        </time>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" itemprop="name">
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed" itemprop="description">
        {{ project.description }}
      </p>

      <!-- Technologies -->
      <div v-if="project.technologies?.length" class="flex flex-wrap gap-1.5 pt-1" itemprop="keywords">
        <span
          v-for="tech in project.technologies.slice(0, 3)"
          :key="tech"
          class="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
        >
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 font-medium">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>

      <!-- Action link -->
      <NuxtLink
        :to="`/project/${project.id}`"
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors mt-1 group/link"
        :aria-label="`${t('projects.buttons.viewProject')} - ${project.title}`"
        itemprop="url"
      >
        {{ t('projects.buttons.viewProject') }}
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
      </NuxtLink>
    </div>
  </article>
</template>
