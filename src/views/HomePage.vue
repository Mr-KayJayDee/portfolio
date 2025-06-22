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
    icon: '💻',
    title: t('home.services.webDev.title'),
    description: t('home.services.webDev.description')
  },
  {
    icon: '📱',
    title: t('home.services.mobileApps.title'),
    description: t('home.services.mobileApps.description')
  },
  {
    icon: '🚀',
    title: t('home.services.optimization.title'),
    description: t('home.services.optimization.description')
  },
  {
    icon: '🛠️',
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

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6" style="color: var(--text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
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
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2 class="mb-lg">{{ t('home.services.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            {{ t('home.services.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          <div v-for="(service, index) in services" :key="service.title" class="card text-center animate-fade-in-up"
            :style="{ 'animation-delay': `${index * 0.1}s` }">
            <div class="card-body">
              <div class="text-4xl mb-lg">{{ service.icon }}</div>
              <h3 class="text-xl font-bold mb-md">{{ service.title }}</h3>
              <p class="text-secondary">{{ service.description }}</p>
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
/* Custom animations with delays */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Responsive utilities */
@media (min-width: 640px) {
  .sm\:flex-row {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Custom utilities */
.max-w-2xl {
  max-width: 42rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.opacity-90 {
  opacity: 0.9;
}

.transform {
  transform: translateX(0);
}

.-translate-x-1\/2 {
  transform: translateX(-50%);
}

.absolute {
  position: absolute;
}

.bottom-8 {
  bottom: 2rem;
}

.left-1\/2 {
  left: 50%;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(-50%, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(-50%, -30px, 0);
  }

  70% {
    transform: translate3d(-50%, -15px, 0);
  }

  90% {
    transform: translate3d(-50%, -4px, 0);
  }
}

.text-secondary {
  color: var(--text-secondary);
}
</style>
