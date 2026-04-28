<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
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
    <!-- Full-width hero image -->
    <section class="relative overflow-hidden">
      <!-- Hero image with overlay -->
      <div class="relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
        <NuxtImg
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="w-full h-full object-cover"
          format="webp"
          loading="eager"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-gray-950 dark:via-gray-950/40 dark:to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent dark:from-gray-950/60 dark:to-transparent" />

        <!-- Back button (floating) -->
        <div class="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <UButton
            variant="solid"
            color="neutral"
            icon="i-lucide-arrow-left"
            :to="localePath('/projects')"
            size="sm"
            class="shadow-lg backdrop-blur-sm"
          >
            {{ t('projects.projectDetail.backToProjects') }}
          </UButton>
        </div>

        <!-- Title overlay at bottom -->
        <div class="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-10">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center gap-3 mb-4">
              <UBadge v-if="project.category" variant="subtle" size="md">{{ project.category }}</UBadge>
              <span v-if="project.date" class="text-sm text-gray-500 dark:text-gray-400 font-mono">{{ project.date }}</span>
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl tracking-tight">{{ project.title }}</h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Content area -->
    <section class="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-14">
            <!-- Description -->
            <div>
              <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{{ project.description }}</p>

              <!-- CTA Buttons -->
              <div class="flex flex-wrap gap-3">
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

            <!-- About -->
            <div class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-7 sm:p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                <div class="w-1 h-6 rounded-full bg-brand-500" />
                {{ t('projects.projectDetail.aboutProject') }}
              </h2>
              <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                {{ project.longDescription || project.description }}
              </p>

              <!-- Features -->
              <div v-if="project.features" class="mt-8">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-5">{{ t('projects.projectDetail.keyFeatures') }}</h3>
                <ul class="space-y-3">
                  <li v-for="feature in project.features" :key="feature" class="flex items-start gap-3 group">
                    <div class="w-6 h-6 rounded-lg bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-500/20 transition-colors">
                      <UIcon name="i-lucide-check" class="text-brand-500 w-3.5 h-3.5" />
                    </div>
                    <span class="text-gray-600 dark:text-gray-300">{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Technologies -->
            <div v-if="project.technologies.length" class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-7 sm:p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                <div class="w-1 h-6 rounded-full bg-brand-500" />
                {{ t('projects.projectDetail.technologiesUsed') }}
              </h2>
              <div class="flex flex-wrap gap-2">
                <TechBadge v-for="tech in project.technologies" :key="tech" :tech="tech" />
              </div>
            </div>

            <!-- Gallery Thumbnails -->
            <div v-if="project.gallery?.length" class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-7 sm:p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                <div class="w-1 h-6 rounded-full bg-brand-500" />
                {{ t('projects.projectDetail.gallery') }}
              </h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  v-for="(image, index) in project.gallery"
                  :key="index"
                  class="relative rounded-xl overflow-hidden group cursor-pointer border border-gray-200/80 dark:border-gray-800/50 aspect-video"
                  @click="galleryRef?.openGallery(index)"
                >
                  <NuxtImg
                    :src="image"
                    :alt="`${project.title} - Image ${index + 1}`"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          <aside class="sticky top-24 space-y-6">
            <!-- Project Info Card -->
            <div class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <UIcon name="i-lucide-info" class="text-brand-500 w-4 h-4" />
                {{ t('projects.projectDetail.projectInfo') }}
              </h3>

              <div class="space-y-4 text-sm">
                <div v-if="project.date" class="flex justify-between items-center py-3 border-b border-gray-200/60 dark:border-gray-800/40">
                  <span class="text-gray-500 dark:text-gray-400">{{ t('projects.projectDetail.date') }}</span>
                  <span class="font-semibold text-gray-900 dark:text-white font-mono text-xs">{{ project.date }}</span>
                </div>
                <div v-if="project.category" class="flex justify-between items-center py-3">
                  <span class="text-gray-500 dark:text-gray-400">{{ t('projects.projectDetail.category') }}</span>
                  <UBadge variant="subtle" size="xs">{{ project.category }}</UBadge>
                </div>
              </div>
            </div>

            <!-- Related Projects -->
            <div v-if="relatedProjects.length > 0" class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <UIcon name="i-lucide-layers" class="text-brand-500 w-4 h-4" />
                {{ t('projects.projectDetail.relatedProjects') }}
              </h3>
              <div class="space-y-3">
                <NuxtLink
                  v-for="related in relatedProjects"
                  :key="related.id"
                  :to="localePath(`/project/${related.id}`)"
                  class="flex gap-3 p-3 rounded-xl border border-transparent hover:border-brand-500/20 hover:bg-brand-500/5 transition-all duration-200 group"
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
                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{{ related.description }}</p>
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
