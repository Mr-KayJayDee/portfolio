<script setup lang="ts">
import { computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useI18n } from '@/composables/useI18n'
import TechBadge from '@/components/TechBadge.vue'
import { techStack } from '@/data/techstack'

const { t } = useI18n()

// SEO
useSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  keywords: 'full stack developer, vue.js expert, react developer, node.js specialist, javascript developer, web development skills, programming expertise, software engineer',
  ogImage: '/portfolio-preview.webp',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Killian',
    'jobTitle': 'Full Stack Developer',
    'description': 'Experienced Full Stack Developer specializing in Vue.js, React, Node.js, and modern JavaScript technologies',
    'url': 'https://killiandalcin.fr/about',
    'sameAs': [
      'https://github.com/killian',
      'https://linkedin.com/in/killian-dev',
      'https://www.fiverr.com/users/mr_kayjaydee'
    ],
    'knowsAbout': [
      'Vue.js', 'React', 'Node.js', 'TypeScript', 'JavaScript',
      'Web Development', 'API Development', 'Database Design',
      'Discord Bot Development', 'Full Stack Development'
    ],
    'skills': Object.values(techStack).flat().map(tech => tech.name)
  }
})

const techCategories = computed(() => [
  {
    key: 'programming',
    title: t('about.skills.programming'),
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    color: 'var(--color-primary)'
  },
  {
    key: 'front',
    title: t('about.skills.frontend'),
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    color: 'var(--color-secondary)'
  },
  {
    key: 'database',
    title: t('about.skills.backend'),
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    color: 'var(--color-success)'
  },
  {
    key: 'devtools',
    title: t('about.skills.tools'),
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    color: 'var(--color-warning)'
  }
])

const approachCards = computed(() => [
  {
    title: t('about.approach.performance.title'),
    description: t('about.approach.performance.description'),
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'var(--color-primary)'
  },
  {
    title: t('about.approach.architecture.title'),
    description: t('about.approach.architecture.description'),
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    color: 'var(--color-secondary)'
  },
  {
    title: t('about.approach.quality.title'),
    description: t('about.approach.quality.description'),
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'var(--color-success)'
  },
  {
    title: t('about.approach.collaboration.title'),
    description: t('about.approach.collaboration.description'),
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    color: 'var(--color-warning)'
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
            {{ t('about.title') }}
          </h1>
          <p class="hero-subtitle">
            {{ t('about.subtitle') }}
          </p>
          <div class="max-w-4xl mx-auto text-center">
            <div class="space-y-lg text-xl text-secondary">
              <p>
                {{ t('about.intro.content') }}
              </p>
              <p>
                {{ t('about.experience.content') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2 class="mb-lg">{{ t('about.skills.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            {{ t('about.subtitle') }}
          </p>
        </div>

        <!-- Tech Categories Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl mb-2xl">
          <div v-for="category in techCategories" :key="category.key" class="card animate-fade-in-up">
            <div class="card-body">
              <div class="flex items-center mb-lg">
                <div class="category-icon" :style="{ background: category.color, color: 'var(--text-inverse)' }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold">{{ category.title }}</h3>
              </div>
              <div class="flex flex-wrap gap-sm">
                <TechBadge v-for="tech in techStack[category.key as keyof typeof techStack]" :key="tech.name"
                  :tech="tech" :show-level="true" />
              </div>
            </div>
          </div>
        </div>

        <!-- Operating Systems -->
        <div class="card animate-fade-in-up">
          <div class="card-body">
            <div class="flex items-center mb-lg">
              <div class="category-icon" :style="{ background: 'var(--color-info)', color: 'var(--text-inverse)' }">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold">{{ t('about.skills.systems') }}</h3>
            </div>
            <div class="flex flex-wrap gap-sm">
              <TechBadge v-for="tech in techStack.operating_systems" :key="tech.name" :tech="tech"
                :show-level="false" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Approach Section -->
    <section class="approach-section">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2 class="mb-lg">{{ t('about.approach.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            {{ t('about.approach.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div v-for="(card, index) in approachCards" :key="index" class="card animate-fade-in-up"
            :style="{ 'animation-delay': `${index * 0.1}s` }">
            <div class="card-body">
              <div class="flex items-start">
                <div class="approach-icon" :style="{ background: card.color, color: 'var(--text-inverse)' }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="card.icon"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-md">{{ card.title }}</h3>
                  <p class="text-secondary">{{ card.description }}</p>
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
          <h2 class="mb-lg">{{ t('about.cta.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto mb-2xl">
            {{ t('about.cta.description') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-md justify-center">
            <RouterLink to="/contact" class="btn btn-primary btn-lg">
              {{ t('about.cta.button') }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
              </svg>
            </RouterLink>
            <RouterLink to="/projects" class="btn btn-secondary btn-lg">
              {{ t('home.cta.viewProjects') }}
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6">
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
@import './styles/AboutPage.css';
</style>
