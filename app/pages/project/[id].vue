<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { findById, projects } = useProjects()

const project = findById(route.params.id as string)

if (!project.value) {
  throw createError({ status: 404, statusText: 'Project not found' })
}

const galleryRef = useTemplateRef('gallery')

const relatedProjects = computed(() => {
  if (!project.value) return []
  return projects.value
    .filter((p) => p.id !== project.value!.id && p.category === project.value!.category)
    .slice(0, 3)
})

useSeoMeta({
  title: () => project.value?.title ?? '',
  description: () => project.value?.description ?? '',
  ogTitle: () => project.value?.title ?? '',
  ogDescription: () => project.value?.description ?? '',
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogType: 'website',
})
</script>

<template>
  <div v-if="project">
    <!-- Back navigation -->
    <div class="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <UButton
          variant="ghost"
          icon="i-lucide-arrow-left"
          to="/projects"
          size="sm"
          class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          {{ t('projects.projectDetail.backToProjects') }}
        </UButton>
      </div>
    </div>

    <!-- Hero section -->
    <section class="bg-gray-50 dark:bg-gray-900/30 pb-16 pt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <!-- Project Image -->
          <div class="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="w-full h-auto object-cover"
              format="webp"
              loading="lazy"
            />
          </div>

          <!-- Project Info -->
          <div class="flex flex-col justify-center space-y-6">
            <div class="flex items-center gap-3">
              <UBadge v-if="project.category" variant="subtle" size="md">{{ project.category }}</UBadge>
              <span v-if="project.date" class="text-sm text-gray-400 dark:text-gray-500 font-medium">{{ project.date }}</span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h1>
            <p class="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">{{ project.description }}</p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-3 pt-2">
              <UButton
                v-if="project.demoUrl"
                :to="project.demoUrl"
                target="_blank"
                icon="i-lucide-external-link"
                size="lg"
                class="font-semibold"
              >
                {{ t('projects.projectDetail.viewDemo') }}
              </UButton>

              <UButton
                v-if="project.githubUrl"
                :to="project.githubUrl"
                target="_blank"
                variant="soft"
                icon="i-lucide-github"
                size="lg"
              >
                {{ t('projects.projectDetail.sourceCode') }}
              </UButton>

              <UButton
                v-for="button in project.buttons"
                :key="button.title"
                :to="button.link"
                target="_blank"
                variant="outline"
                icon="i-lucide-external-link"
                size="lg"
              >
                {{ button.title }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-16">
            <!-- About -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">{{ t('projects.projectDetail.aboutProject') }}</h2>
              <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                {{ project.longDescription || project.description }}
              </p>

              <!-- Features -->
              <div v-if="project.features" class="mt-8">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ t('projects.projectDetail.keyFeatures') }}</h3>
                <ul class="space-y-3">
                  <li v-for="feature in project.features" :key="feature" class="flex items-start gap-3">
                    <div class="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <UIcon name="i-lucide-check" class="text-brand-500 w-3.5 h-3.5" />
                    </div>
                    <span class="text-gray-600 dark:text-gray-300">{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Technologies -->
            <div v-if="project.technologies.length">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">{{ t('projects.projectDetail.technologiesUsed') }}</h2>
              <div class="flex flex-wrap gap-2">
                <TechBadge v-for="tech in project.technologies" :key="tech" :tech="tech" />
              </div>
            </div>

            <!-- Gallery Thumbnails -->
            <div v-if="project.gallery?.length">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">{{ t('projects.projectDetail.gallery') }}</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button
                  v-for="(image, index) in project.gallery"
                  :key="index"
                  class="relative rounded-xl overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-800"
                  @click="galleryRef?.openGallery(index)"
                >
                  <NuxtImg
                    :src="image"
                    :alt="`${project.title} - Image ${index + 1}`"
                    class="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    format="webp"
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <UIcon name="i-lucide-zoom-in" class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-6">
            <!-- Project Info Card -->
            <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 sticky top-24">
              <h3 class="font-bold text-gray-900 dark:text-white mb-5">{{ t('projects.projectDetail.projectInfo') }}</h3>

              <div class="space-y-4 text-sm">
                <div v-if="project.date" class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                  <span class="text-gray-500 dark:text-gray-400">{{ t('projects.projectDetail.date') }}</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ project.date }}</span>
                </div>
                <div v-if="project.category" class="flex justify-between items-center py-2">
                  <span class="text-gray-500 dark:text-gray-400">{{ t('projects.projectDetail.category') }}</span>
                  <UBadge variant="subtle" size="xs">{{ project.category }}</UBadge>
                </div>
              </div>
            </div>

            <!-- Related Projects -->
            <div v-if="relatedProjects.length > 0" class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-5">{{ t('projects.projectDetail.relatedProjects') }}</h3>
              <div class="space-y-4">
                <NuxtLink
                  v-for="related in relatedProjects"
                  :key="related.id"
                  :to="`/project/${related.id}`"
                  class="flex gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <NuxtImg
                    v-if="related.image"
                    :src="related.image"
                    :alt="related.title"
                    width="60"
                    height="45"
                    class="rounded-lg object-cover shrink-0"
                    loading="lazy"
                  />
                  <div class="min-w-0">
                    <p class="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-brand-500 transition-colors">{{ related.title }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">{{ related.description }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Gallery Modal -->
    <ProjectGallery
      v-if="project.gallery?.length"
      ref="gallery"
      :gallery="project.gallery"
      :project-title="project.title"
    />
  </div>
</template>
