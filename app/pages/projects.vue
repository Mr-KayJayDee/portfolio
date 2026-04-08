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
  <div>
    <!-- Hero -->
    <section class="pt-16 pb-12 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-7xl mx-auto text-center">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Portfolio</span>
        <h1 class="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">{{ t('projects.title') }}</h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{{ t('projects.subtitle') }}</p>

        <!-- Stats -->
        <div class="flex justify-center gap-10 mt-10">
          <div class="text-center">
            <p class="text-3xl font-extrabold text-brand-500 dark:text-brand-400">{{ totalProjects }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('nav.projects') }}</p>
          </div>
          <div class="w-px bg-gray-200 dark:bg-gray-800" />
          <div class="text-center">
            <p class="text-3xl font-extrabold text-brand-500 dark:text-brand-400">{{ featuredCount }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('home.featuredProjects.title') }}</p>
          </div>
          <div class="w-px bg-gray-200 dark:bg-gray-800" />
          <div class="text-center">
            <p class="text-3xl font-extrabold text-brand-500 dark:text-brand-400">{{ categories.length - 1 }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('projects.categories.all') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters & Grid -->
    <section class="py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Filter bar -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            :placeholder="t('common.search') + '...'"
            class="w-full sm:w-72"
            size="md"
          />

          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :variant="selectedCategory === category ? 'solid' : 'soft'"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              size="sm"
              class="font-medium"
              @click="selectedCategory = category"
            >
              {{ category === 'all' ? t('projects.categories.all') : t(`projects.categories.${category.replace(/\s+/g, '').toLowerCase()}`) || category }}
            </UButton>
          </div>
        </div>

        <!-- Projects Grid -->
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-24">
          <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <UIcon name="i-lucide-search-x" class="text-2xl text-gray-400" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('projects.noResults.title') }}</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">{{ t('projects.noResults.description') }}</p>
          <UButton @click="resetFilters" variant="soft" size="md">
            {{ t('common.reset') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
