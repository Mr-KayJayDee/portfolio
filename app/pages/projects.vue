<script setup lang="ts">
const { t } = useI18n()
const { projects } = useProjects()

useSeoMeta({
  title: () => t('seo.projects.title'),
  description: () => t('seo.projects.description'),
  ogTitle: () => t('seo.projects.title'),
  ogDescription: () => t('seo.projects.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => [
  'all',
  ...new Set(projects.value.map((p) => p.category).filter(Boolean)),
])

const filteredProjects = computed(() => {
  let result = projects.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query)),
    )
  }

  if (selectedCategory.value !== 'all') {
    result = result.filter((project) => project.category === selectedCategory.value)
  }

  return result
})

const totalProjects = computed(() => projects.value.length)
const featuredCount = computed(() => projects.value.filter((p) => p.featured).length)

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ t('projects.title') }}</h1>
      <p class="text-lg text-muted max-w-2xl mx-auto">{{ t('projects.subtitle') }}</p>

      <!-- Stats -->
      <div class="flex justify-center gap-8 mt-8">
        <div class="text-center">
          <p class="text-3xl font-bold text-primary">{{ totalProjects }}</p>
          <p class="text-sm text-muted">{{ t('nav.projects') }}</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-primary">{{ featuredCount }}</p>
          <p class="text-sm text-muted">{{ t('home.featuredProjects.title') }}</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-primary">{{ categories.length - 1 }}</p>
          <p class="text-sm text-muted">{{ t('projects.categories.all') }}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 items-center mb-8">
      <UInput
        v-model="searchQuery"
        icon="i-lucide-search"
        :placeholder="t('common.search') + '...'"
        class="w-full sm:w-80"
      />

      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="category in categories"
          :key="category"
          :variant="selectedCategory === category ? 'solid' : 'soft'"
          size="sm"
          @click="selectedCategory = category"
        >
          {{ category === 'all' ? t('projects.categories.all') : t(`projects.categories.${category.replace(/\s+/g, '').toLowerCase()}`) || category }}
        </UButton>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <UIcon name="i-lucide-search-x" class="text-4xl text-muted mb-4" />
      <h3 class="text-lg font-semibold mb-2">{{ t('projects.noResults.title') }}</h3>
      <p class="text-muted mb-6">{{ t('projects.noResults.description') }}</p>
      <UButton @click="resetFilters" variant="soft">
        {{ t('common.reset') }}
      </UButton>
    </div>
  </div>
</template>
