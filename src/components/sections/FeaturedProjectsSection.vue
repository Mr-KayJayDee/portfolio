<template>
  <section class="section">
    <div class="container">
      <div class="text-center mb-2xl">
        <h2 class="mb-lg">{{ t('home.featuredProjects.title') }}</h2>
        <p class="text-xl text-secondary max-w-2xl mx-auto">
          {{ t('home.featuredProjects.subtitle') }}
        </p>
      </div>

      <div class="projects-grid">
        <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project"
          class="animate-fade-in-up" />
      </div>

      <div class="text-center">
        <CTAButtons layout="stack">
          <RouterLink to="/projects" class="btn btn-secondary">
            {{ t('home.featuredProjects.viewAll') }}
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </RouterLink>
        </CTAButtons>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useProjects } from '@/composables/useProjects'
import ProjectCard from '@/components/ProjectCard.vue'
import CTAButtons from '@/components/shared/CTAButtons.vue'

const { t } = useI18n()
const { projects } = useProjects()

// Featured projects
const featuredProjects = computed(() => {
  return projects.value.filter(project => project.featured).slice(0, 3)
})
</script>

<style scoped>
@import '@/components/styles/FeaturedProjectsSection.css';
</style>
