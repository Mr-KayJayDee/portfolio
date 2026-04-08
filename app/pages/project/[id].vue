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
  <div v-if="project" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <UButton
        variant="link"
        icon="i-lucide-arrow-left"
        to="/projects"
      >
        {{ t('projects.projectDetail.backToProjects') }}
      </UButton>
    </nav>

    <!-- Hero Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- Project Image -->
      <div class="rounded-lg overflow-hidden">
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
      <div class="flex flex-col justify-center">
        <div class="flex items-center gap-3 mb-4">
          <UBadge v-if="project.category" variant="subtle">{{ project.category }}</UBadge>
          <span v-if="project.date" class="text-sm text-muted">{{ project.date }}</span>
        </div>

        <h1 class="text-3xl font-bold mb-4">{{ project.title }}</h1>
        <p class="text-lg text-muted mb-6">{{ project.description }}</p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3">
          <UButton
            v-if="project.demoUrl"
            :to="project.demoUrl"
            target="_blank"
            icon="i-lucide-external-link"
          >
            {{ t('projects.projectDetail.viewDemo') }}
          </UButton>

          <UButton
            v-if="project.githubUrl"
            :to="project.githubUrl"
            target="_blank"
            variant="soft"
            icon="i-lucide-github"
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
          >
            {{ button.title }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Content Grid: Main + Sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-12">
        <!-- About -->
        <section>
          <h2 class="text-2xl font-bold mb-4">{{ t('projects.projectDetail.aboutProject') }}</h2>
          <p class="text-muted leading-relaxed">
            {{ project.longDescription || project.description }}
          </p>

          <!-- Features -->
          <div v-if="project.features" class="mt-6">
            <h3 class="text-lg font-semibold mb-3">{{ t('projects.projectDetail.keyFeatures') }}</h3>
            <ul class="space-y-2">
              <li v-for="feature in project.features" :key="feature" class="flex items-start gap-2">
                <UIcon name="i-lucide-check" class="text-primary mt-1 shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Technologies -->
        <section v-if="project.technologies.length">
          <h2 class="text-2xl font-bold mb-4">{{ t('projects.projectDetail.technologiesUsed') }}</h2>
          <div class="flex flex-wrap gap-2">
            <TechBadge v-for="tech in project.technologies" :key="tech" :tech="tech" />
          </div>
        </section>

        <!-- Gallery Thumbnails -->
        <section v-if="project.gallery?.length">
          <h2 class="text-2xl font-bold mb-4">{{ t('projects.projectDetail.gallery') }}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button
              v-for="(image, index) in project.gallery"
              :key="index"
              class="relative rounded-lg overflow-hidden group cursor-pointer"
              @click="galleryRef?.openGallery(index)"
            >
              <NuxtImg
                :src="image"
                :alt="`${project.title} - Image ${index + 1}`"
                class="w-full h-32 object-cover"
                loading="lazy"
                format="webp"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <UIcon name="i-lucide-zoom-in" class="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl" />
              </div>
            </button>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <!-- Project Info Card -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t('projects.projectDetail.projectInfo') }}</h3>
          </template>

          <div class="space-y-3 text-sm">
            <div v-if="project.date" class="flex justify-between">
              <span class="text-muted">{{ t('projects.projectDetail.date') }}</span>
              <span class="font-medium">{{ project.date }}</span>
            </div>
            <div v-if="project.category" class="flex justify-between">
              <span class="text-muted">{{ t('projects.projectDetail.category') }}</span>
              <span class="font-medium">{{ project.category }}</span>
            </div>
          </div>
        </UCard>

        <!-- Related Projects -->
        <div v-if="relatedProjects.length > 0">
          <h3 class="font-semibold mb-4">{{ t('projects.projectDetail.relatedProjects') }}</h3>
          <div class="space-y-3">
            <NuxtLink
              v-for="related in relatedProjects"
              :key="related.id"
              :to="`/project/${related.id}`"
              class="flex gap-3 p-2 rounded-lg hover:bg-elevated transition-colors"
            >
              <NuxtImg
                v-if="related.image"
                :src="related.image"
                :alt="related.title"
                width="60"
                height="45"
                class="rounded object-cover shrink-0"
                loading="lazy"
              />
              <div class="min-w-0">
                <p class="font-medium text-sm truncate">{{ related.title }}</p>
                <p class="text-xs text-muted line-clamp-2">{{ related.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <!-- Gallery Modal -->
    <ProjectGallery
      v-if="project.gallery?.length"
      ref="gallery"
      :gallery="project.gallery"
      :project-title="project.title"
    />
  </div>
</template>
