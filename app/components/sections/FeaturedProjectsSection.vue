<script setup lang="ts">
const { t } = useI18n()
const { featuredProjects } = useProjects()
</script>

<template>
  <section class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.projects.title') }}</h2>
        <p class="text-lg text-muted max-w-2xl mx-auto">{{ t('home.projects.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
