<script setup lang="ts">
import { computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useI18n } from '@/composables/useI18n'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'

const { t } = useI18n()

// SEO
useSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description')
})

// Featured projects
const featuredProjects = computed(() => {
  return projects.filter(project => project.featured).slice(0, 3)
})

// Services data
const services = computed(() => [
  {
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    color: 'var(--color-primary)',
    title: t('home.services.webDev.title'),
    description: t('home.services.webDev.description')
  },
  {
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'var(--color-secondary)',
    title: t('home.services.mobileApps.title'),
    description: t('home.services.mobileApps.description')
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'var(--color-success)',
    title: t('home.services.optimization.title'),
    description: t('home.services.optimization.description')
  },
  {
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    color: 'var(--color-warning)',
    title: t('home.services.maintenance.title'),
    description: t('home.services.maintenance.description')
  }
])
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content animate-fade-in-up">
          <h1 class="hero-title">
            {{ t('home.title') }}
          </h1>
          <p class="hero-subtitle">
            {{ t('home.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-md justify-center">
            <RouterLink to="/projects" class="btn btn-primary btn-lg">
              {{ t('home.cta.viewProjects') }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6">
                </path>
              </svg>
            </RouterLink>
            <RouterLink to="/contact" class="btn btn-secondary btn-lg">
              {{ t('home.cta.contactMe') }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                </path>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2 class="mb-lg">{{ t('home.featuredProjects.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            {{ t('home.featuredProjects.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl mb-2xl">
          <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project"
            class="animate-fade-in-up" />
        </div>

        <div class="text-center">
          <RouterLink to="/projects" class="btn btn-secondary">
            {{ t('home.featuredProjects.viewAll') }}
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2 class="mb-lg">{{ t('home.services.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            {{ t('home.services.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div v-for="(service, index) in services" :key="index" class="card animate-fade-in-up"
            :style="{ 'animation-delay': `${index * 0.1}s` }">
            <div class="card-body">
              <div class="flex items-start">
                <div class="service-icon" :style="{ background: service.color, color: 'var(--text-inverse)' }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-md">{{ service.title }}</h3>
                  <p class="text-secondary">{{ service.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section">
      <div class="container">
        <div class="text-center">
          <h2 class="mb-lg">{{ t('home.cta2.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto mb-2xl">
            {{ t('home.cta2.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-md justify-center">
            <RouterLink to="/contact" class="btn btn-primary btn-lg">
              {{ t('home.cta2.startProject') }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                </path>
              </svg>
            </RouterLink>
            <RouterLink to="/about" class="btn btn-secondary btn-lg">
              {{ t('home.cta2.learnMore') }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import './styles/HomePage.css';
</style>
