<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { useAssets } from '@/composables/useAssets'
import { projects } from '@/data/projects'
import TechBadge from '@/components/TechBadge.vue'

const route = useRoute()
const router = useRouter()
const { getImageUrl } = useAssets()

// Find project by ID
const project = computed(() => {
  const id = route.params.id as string
  return projects.find(p => p.id === id)
})

// Related projects
const relatedProjects = computed(() => {
  if (!project.value) return []

  return projects
    .filter(p => p.id !== project.value?.id && p.category === project.value?.category)
    .slice(0, 3)
})

// SEO
const seoTitle = computed(() => project.value ? `${project.value.title} - Killian` : 'Projet - Killian')
const seoDescription = computed(() => project.value?.description || 'Découvrez ce projet en détail')

useSeo({
  title: seoTitle.value,
  description: seoDescription.value
})

// Navigation
const goBack = () => {
  router.push('/projects')
}

const shareProject = () => {
  if (navigator.share && project.value) {
    navigator.share({
      title: project.value.title,
      text: project.value.description,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
  }
}

// Check if project exists
onMounted(() => {
  if (!project.value) {
    router.push('/projects')
  }
})
</script>

<template>
  <main v-if="project" class="project-detail-page">
    <!-- Hero Section - Redesigned -->
    <section class="project-hero">
      <div class="container">
        <div class="hero-content">
          <!-- Navigation -->
          <nav class="breadcrumb">
            <button @click="goBack" class="breadcrumb-link">
              <svg class="breadcrumb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Retour aux projets
            </button>
          </nav>

          <div class="hero-grid">
            <!-- Project Image -->
            <div class="project-image-container">
              <img v-if="project.image" :src="getImageUrl(project.image)" :alt="project.title" class="project-image">
              <div class="image-overlay"></div>
            </div>

            <!-- Project Info -->
            <div class="project-info">
              <div class="project-meta">
                <span v-if="project.category" class="project-category">{{ project.category }}</span>
                <span v-if="project.date" class="project-date">{{ project.date }}</span>
              </div>

              <h1 class="project-title">{{ project.title }}</h1>
              <p class="project-description">{{ project.description }}</p>

              <!-- Actions -->
              <div class="project-actions">
                <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer"
                  class="btn btn-primary">
                  <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Voir la démo
                </a>

                <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
                  class="btn btn-secondary">
                  <svg class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Code source
                </a>

                <!-- Buttons from project data -->
                <a v-for="button in project.buttons" :key="button.title" :href="button.link" target="_blank"
                  rel="noopener noreferrer" class="btn btn-outline">
                  <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  {{ button.title }}
                </a>

                <button @click="shareProject" class="btn btn-ghost">
                  <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z">
                    </path>
                  </svg>
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="project-content">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <!-- Project Details -->
            <div class="content-section">
              <h2 class="section-title">À propos du projet</h2>
              <div class="section-content">
                <p class="project-long-description">
                  {{ project.longDescription || project.description }}
                </p>

                <!-- Features -->
                <div v-if="project.features" class="features-list">
                  <h3 class="features-title">Fonctionnalités principales</h3>
                  <ul class="features">
                    <li v-for="feature in project.features" :key="feature" class="feature-item">
                      <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Technologies -->
            <div v-if="project.technologies" class="content-section">
              <h2 class="section-title">Technologies utilisées</h2>
              <div class="section-content">
                <div class="tech-grid">
                  <TechBadge v-for="tech in project.technologies" :key="tech" :tech="tech" class="tech-item" />
                </div>
              </div>
            </div>

            <!-- Gallery -->
            <div v-if="project.gallery" class="content-section">
              <h2 class="section-title">Galerie</h2>
              <div class="section-content">
                <div class="gallery-grid">
                  <div v-for="(image, index) in project.gallery" :key="index" class="gallery-item">
                    <img :src="getImageUrl(image)" :alt="`${project.title} - Image ${index + 1}`" class="gallery-image">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="sidebar">
            <!-- Project Info Card -->
            <div class="info-card">
              <h3 class="info-title">Informations du projet</h3>
              <div class="info-list">
                <div v-if="project.date" class="info-item">
                  <span class="info-label">Date</span>
                  <span class="info-value">{{ project.date }}</span>
                </div>

                <div v-if="project.category" class="info-item">
                  <span class="info-label">Catégorie</span>
                  <span class="info-value">{{ project.category }}</span>
                </div>

                <div v-if="project.status" class="info-item">
                  <span class="info-label">Statut</span>
                  <span class="info-value">{{ project.status }}</span>
                </div>

                <!-- <div v-if="project.duration" class="info-item">
                  <span class="info-label">Durée</span>
                  <span class="info-value">{{ project.duration }}</span>
                </div> -->
              </div>
            </div>

            <!-- Related Projects -->
            <div v-if="relatedProjects.length > 0" class="related-projects">
              <h3 class="related-title">Projets similaires</h3>
              <div class="related-list">
                <router-link v-for="relatedProject in relatedProjects" :key="relatedProject.id"
                  :to="`/projects/${relatedProject.id}`" class="related-item">
                  <img v-if="relatedProject.image" :src="getImageUrl(relatedProject.image)" :alt="relatedProject.title"
                    class="related-image">
                  <div class="related-content">
                    <h4 class="related-project-title">{{ relatedProject.title }}</h4>
                    <p class="related-project-description">{{ relatedProject.description }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import './styles/ProjectDetailPage.css';
</style>
