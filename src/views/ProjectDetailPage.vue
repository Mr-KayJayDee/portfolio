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
/* Project Detail Page Styles - Redesigned */
.project-detail-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section - New Layout */
.project-hero {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: var(--space-2xl) 0 var(--space-4xl);
  position: relative;
  overflow: hidden;
}

.project-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: var(--space-2xl);
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
}

.breadcrumb-link:hover {
  color: var(--color-primary);
  background: var(--bg-secondary);
}

.breadcrumb-icon {
  width: 16px;
  height: 16px;
}

/* Hero Grid Layout */
.hero-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

/* Project Image Container */
.project-image-container {
  position: relative;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  background: var(--bg-secondary);
}

.project-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.project-image-container:hover .image-overlay {
  opacity: 1;
}

/* Project Info */
.project-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 300px;
}

.project-meta {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.project-category {
  background: var(--color-primary);
  color: white;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.project-date {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: var(--border-width) solid var(--border-color);
}

.project-title {
  font-size: clamp(var(--font-size-3xl), 4vw, var(--font-size-4xl));
  font-weight: var(--font-weight-extrabold);
  margin-bottom: var(--space-lg);
  line-height: var(--line-height-tight);
  color: var(--text-primary);
}

.project-description {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-2xl);
  color: var(--text-secondary);
}

/* Actions */
.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

/* Styles de boutons supprimés - utilisent maintenant les styles globaux */

/* Content Section */
.project-content {
  padding: var(--space-4xl) 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-4xl);
}

.main-content {
  min-width: 0;
}

.content-section {
  margin-bottom: var(--space-4xl);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 3px solid var(--color-primary);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--color-secondary);
}

.section-content {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

.project-long-description {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-xl);
  line-height: var(--line-height-relaxed);
}

/* Features */
.features-list {
  margin-top: var(--space-2xl);
}

.features-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-md);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  border: var(--border-width) solid var(--border-color);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
}

.feature-item:hover {
  transform: translateX(4px);
  border-color: var(--color-primary);
}

.feature-icon {
  width: 20px;
  height: 20px;
  color: var(--color-success);
  flex-shrink: 0;
}

/* Technologies */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.tech-item {
  animation: fadeInUp 0.6s ease-out;
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
}

.gallery-item {
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-fast);
  background: var(--bg-secondary);
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

/* Info Card */
.info-card {
  background: var(--bg-secondary);
  border-radius: var(--border-radius-xl);
  padding: var(--space-xl);
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.info-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) 0;
  border-bottom: var(--border-width) solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
}

.info-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

/* Related Projects */
.related-projects {
  background: var(--bg-secondary);
  border-radius: var(--border-radius-xl);
  padding: var(--space-xl);
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.related-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.related-item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
  text-decoration: none;
  color: inherit;
  border: var(--border-width) solid transparent;
}

.related-item:hover {
  background: var(--bg-primary);
  border-color: var(--border-color);
  transform: translateX(4px);
}

.related-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
  flex-shrink: 0;
}

.related-content {
  flex: 1;
  min-width: 0;
}

.related-project-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  line-height: var(--line-height-tight);
}

.related-project-description {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-grid {
    grid-template-columns: 350px 1fr;
    gap: var(--space-2xl);
  }

  .content-grid {
    grid-template-columns: 1fr 280px;
    gap: var(--space-3xl);
  }
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .project-image-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .project-hero {
    padding: var(--space-xl) 0 var(--space-2xl);
  }

  .hero-grid {
    gap: var(--space-xl);
  }

  .project-image {
    height: 250px;
  }

  .project-info {
    min-height: auto;
  }

  .project-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .project-actions .btn,
  .project-actions .btn-outline {
    justify-content: center;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .related-item {
    flex-direction: column;
    text-align: center;
  }

  .related-image {
    width: 100%;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .project-meta {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .project-category,
  .project-date {
    display: inline-block;
    width: fit-content;
  }

  .features {
    gap: var(--space-sm);
  }

  .feature-item {
    padding: var(--space-sm);
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
