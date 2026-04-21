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
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// portfolio</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('projects.title') }}</h1>
        <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">{{ t('projects.subtitle') }}</p>

        <!-- Stats -->
        <div class="flex justify-center gap-8 sm:gap-12 mt-12">
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ totalProjects }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('nav.projects') }}</p>
          </div>
          <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ featuredCount }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('home.featuredProjects.title') }}</p>
          </div>
          <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <div class="text-center">
            <p class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ categories.length - 1 }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('projects.categories.all') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters & Grid -->
    <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Filter bar -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12 p-4 sm:p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm">
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
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-32">
          <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/30 flex items-center justify-center">
            <UIcon name="i-lucide-search-x" class="text-2xl text-gray-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ t('projects.noResults.title') }}</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">{{ t('projects.noResults.description') }}</p>
          <UButton variant="soft" size="md" icon="i-lucide-rotate-ccw" @click="resetFilters">
            {{ t('common.reset') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
