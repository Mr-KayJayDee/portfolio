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
  <article class="group" itemscope itemtype="https://schema.org/CreativeWork">
    <UCard>
      <!-- Image -->
      <template #header>
        <NuxtLink :to="`/project/${project.id}`">
          <NuxtImg
            :src="project.image"
            :alt="`${project.title} - ${project.description.slice(0, 60)}...`"
            loading="lazy"
            format="webp"
            width="400"
            height="300"
            class="w-full h-48 object-cover"
            itemprop="image"
          />
        </NuxtLink>
      </template>

      <!-- Content -->
      <div class="flex flex-col gap-3">
        <!-- Category & Date -->
        <div class="flex items-center justify-between">
          <UBadge v-if="project.category" color="primary" variant="subtle" itemprop="genre">
            {{ translatedCategory }}
          </UBadge>
          <time v-if="project.date" class="text-sm text-muted" :datetime="project.date" itemprop="dateCreated">
            {{ project.date }}
          </time>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold" itemprop="name">
          {{ project.title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-muted line-clamp-2" itemprop="description">
          {{ project.description }}
        </p>

        <!-- Technologies -->
        <div v-if="project.technologies?.length" class="flex flex-wrap gap-1" itemprop="keywords">
          <UBadge
            v-for="tech in project.technologies.slice(0, 3)"
            :key="tech"
            variant="subtle"
            color="neutral"
            size="sm"
          >
            {{ tech }}
          </UBadge>
          <UBadge v-if="project.technologies.length > 3" variant="subtle" color="neutral" size="sm">
            +{{ project.technologies.length - 3 }}
          </UBadge>
        </div>
      </div>

      <!-- Action -->
      <template #footer>
        <UButton
          :to="`/project/${project.id}`"
          variant="ghost"
          icon="i-lucide-chevron-right"
          trailing
          block
          :aria-label="`${t('projects.buttons.viewProject')} - ${project.title}`"
          itemprop="url"
        >
          {{ t('projects.buttons.viewProject') }}
        </UButton>
      </template>
    </UCard>
  </article>
</template>
