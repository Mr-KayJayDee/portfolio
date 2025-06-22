<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useI18n } from '@/composables/useI18n'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'

const { t } = useI18n()

// SEO
useSeo({
  title: t('seo.projects.title'),
  description: t('seo.projects.description')
})

// Filters and search
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('date')

// Get unique categories
const categories = computed(() => {
  const cats = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))]
  return cats
})

// Filtered and sorted projects
const filteredProjects = computed(() => {
  let filtered = projects

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(query))
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(project => project.category === selectedCategory.value)
  }

  // Sort projects
  if (sortBy.value === 'date') {
    filtered = filtered.sort((a, b) => {
      const dateA = parseInt(a.date || '0')
      const dateB = parseInt(b.date || '0')
      return dateB - dateA // Most recent first
    })
  } else if (sortBy.value === 'name') {
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  return filtered
})

// Stats
const totalProjects = computed(() => projects.length)
const featuredProjects = computed(() => projects.filter(p => p.featured).length)
</script>

<template>
  <main class="projects-page">
    <!-- Hero Section -->
    <section class="projects-hero">
      <div class="container">
        <div class="hero-content text-center">
          <h1 class="hero-title">{{ t('projects.title') }}</h1>
          <p class="hero-subtitle">
            {{ t('projects.subtitle') }}
          </p>

          <!-- Stats -->
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ totalProjects }}</div>
              <div class="stat-label">{{ t('nav.projects') }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ featuredProjects }}</div>
              <div class="stat-label">{{ t('home.featuredProjects.title') }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ categories.length - 1 }}</div>
              <div class="stat-label">{{ t('projects.categories.all') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-container">
          <!-- Search -->
          <div class="search-container">
            <div class="search-input-wrapper">
              <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input v-model="searchQuery" type="text" :placeholder="t('common.search') + '...'" class="search-input">
            </div>
          </div>

          <!-- Category Filter -->
          <div class="filter-group">
            <label class="filter-label">{{ t('common.filter') }}</label>
            <select v-model="selectedCategory" class="filter-select">
              <option value="all">{{ t('projects.categories.all') }}</option>
              <option v-for="category in categories.slice(1)" :key="category" :value="category">
                {{ t(`projects.categories.${category?.replace(/\s+/g, '').toLowerCase()}`) || category }}
              </option>
            </select>
          </div>

          <!-- Sort -->
          <div class="filter-group">
            <label class="filter-label">{{ t('common.sort') }}</label>
            <select v-model="sortBy" class="filter-select">
              <option value="date">Date</option>
              <option value="name">{{ t('nav.projects') }}</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-grid-section">
      <div class="container">
        <!-- Results Info -->
        <div class="results-info">
          <p class="results-text">
            {{ filteredProjects.length }} {{ t('nav.projects').toLowerCase() }}{{ filteredProjects.length > 1 ? 's' : ''
            }} {{ t('common.search').toLowerCase() }}{{ filteredProjects.length > 1 ? 's' : '' }}
          </p>
        </div>

        <!-- Projects Grid -->
        <div v-if="filteredProjects.length > 0" class="projects-grid">
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project"
            class="project-card-item" />
        </div>

        <!-- No Results -->
        <div v-else class="no-results">
          <div class="no-results-content">
            <svg class="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.5-2.709">
              </path>
            </svg>
            <h3 class="no-results-title">{{ t('projects.noResults.title') }}</h3>
            <p class="no-results-description">
              {{ t('projects.noResults.description') }}
            </p>
            <button @click="searchQuery = ''; selectedCategory = 'all'" class="btn btn-primary">
              {{ t('common.reset') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Projects Page Styles */
.projects-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section */
.projects-hero {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: var(--space-4xl) 0 var(--space-3xl);
  position: relative;
  overflow: hidden;
}

.projects-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(var(--font-size-4xl), 4vw, var(--font-size-5xl));
  font-weight: var(--font-weight-extrabold);
  margin-bottom: var(--space-lg);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--line-height-relaxed);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  max-width: 400px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--space-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

/* Filters Section */
.filters-section {
  background: var(--bg-primary);
  padding: var(--space-xl) 0;
  border-bottom: var(--border-width) solid var(--border-color);
  position: sticky;
  top: 80px;
  z-index: 10;
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  align-items: end;
}

.search-container {
  flex: 1;
  min-width: 300px;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-tertiary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--space-md) var(--space-md) var(--space-md) 48px;
  font-size: var(--font-size-base);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-width: 150px;
}

.filter-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.filter-select {
  padding: var(--space-md);
  font-size: var(--font-size-base);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
}

/* Projects Grid Section */
.projects-grid-section {
  padding: var(--space-2xl) 0;
}

.results-info {
  margin-bottom: var(--space-xl);
}

.results-text {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-xl);
}

.project-card-item {
  animation: fadeInUp 0.6s ease-out;
}

/* No Results */
.no-results {
  display: flex;
  justify-content: center;
  padding: var(--space-4xl) 0;
}

.no-results-content {
  text-align: center;
  max-width: 400px;
}

.no-results-icon {
  width: 64px;
  height: 64px;
  color: var(--text-tertiary);
  margin: 0 auto var(--space-lg);
}

.no-results-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.no-results-description {
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  line-height: var(--line-height-relaxed);
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }

  .stat-number {
    font-size: var(--font-size-2xl);
  }

  .filters-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    min-width: auto;
  }

  .filter-group {
    min-width: auto;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .filters-section {
    position: static;
  }
}

@media (max-width: 480px) {
  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .stats-grid {
    gap: var(--space-sm);
  }

  .stat-number {
    font-size: var(--font-size-xl);
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

/* Utility Classes */
.text-center {
  text-align: center;
}
</style>
