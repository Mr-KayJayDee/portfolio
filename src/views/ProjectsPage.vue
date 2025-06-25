<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useI18n } from '@/composables/useI18n'
import { useProjects } from '@/composables/useProjects'
import ProjectCard from '@/components/ProjectCard.vue'
import CTAButtons from '@/components/shared/CTAButtons.vue'

const { t } = useI18n()
const { projects } = useProjects()

// SEO
useSeo({
  title: t('seo.projects.title'),
  description: t('seo.projects.description'),
  keywords: 'web development portfolio, vue.js projects, react applications, node.js projects, javascript portfolio, full stack projects, discord bot examples, open source projects',
  ogImage: '/portfolio-preview.webp',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Web Development Portfolio Projects',
    'description': 'Browse professional web development projects including Vue.js applications, React websites, Node.js APIs, and Discord bots',
    'url': 'https://killiandalcin.fr/projects',
    'hasPart': projects.value.map(project => ({
      '@type': 'CreativeWork',
      'name': project.title,
      'description': project.description,
      'url': `https://killiandalcin.fr/project/${project.id}`,
      'keywords': project.technologies?.join(', ')
    }))
  }
})

// Filters and search
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('date')

// Get unique categories
const categories = computed(() => {
  const cats = ['all', ...new Set(projects.value.map(p => p.category).filter(Boolean))]
  return cats
})

// Filtered and sorted projects
const filteredProjects = computed(() => {
  let filtered = projects.value

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
const totalProjects = computed(() => projects.value.length)
const featuredProjects = computed(() => projects.value.filter(p => p.featured).length)
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
            <CTAButtons layout="stack">
              <button @click="searchQuery = ''; selectedCategory = 'all'" class="btn btn-primary">
                {{ t('common.reset') }}
              </button>
            </CTAButtons>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import './styles/ProjectsPage.css';
</style>
