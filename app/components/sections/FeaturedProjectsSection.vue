<script setup lang="ts">
const { t } = useI18n()
const { featuredProjects } = useProjects()
</script>

<template>
  <section class="py-20 md:py-28 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
        <div>
          <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Portfolio</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('home.featuredProjects.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">{{ t('home.featuredProjects.subtitle') }}</p>
        </div>
        <UButton to="/projects" variant="ghost" trailing-icon="i-lucide-arrow-right" class="shrink-0 self-start md:self-auto">
          {{ t('home.cta.viewProjects') }}
        </UButton>
      </div>

      <!-- Projects grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
