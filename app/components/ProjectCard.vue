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
    class="group relative rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5"
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
        class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        itemprop="image"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
        <span class="text-white text-sm font-semibold flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {{ t('projects.buttons.viewProject') }}
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </span>
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="p-5 sm:p-6 flex flex-col gap-3">
      <!-- Category & Date -->
      <div class="flex items-center justify-between">
        <UBadge v-if="project.category" color="primary" variant="subtle" itemprop="genre">
          {{ translatedCategory }}
        </UBadge>
        <time v-if="project.date" class="text-xs text-gray-400 dark:text-gray-500 font-mono" :datetime="project.date" itemprop="dateCreated">
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
      <div v-if="project.technologies?.length" class="flex flex-wrap gap-1.5 pt-2" itemprop="keywords">
        <span
          v-for="tech in project.technologies.slice(0, 3)"
          :key="tech"
          class="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 font-medium border border-gray-200/50 dark:border-gray-700/30"
        >
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800/80 text-gray-500 dark:text-gray-500 font-medium border border-gray-200/50 dark:border-gray-700/30">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>
    </div>

    <!-- Hidden SEO link -->
    <NuxtLink
      :to="`/project/${project.id}`"
      class="absolute inset-0 z-10"
      :aria-label="`${t('projects.buttons.viewProject')} - ${project.title}`"
      itemprop="url"
    />
  </article>
</template>
