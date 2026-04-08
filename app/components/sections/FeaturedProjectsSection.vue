<script setup lang="ts">
const { t } = useI18n()
const { featuredProjects } = useProjects()
</script>

<template>
  <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// portfolio</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('home.featuredProjects.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl leading-relaxed">{{ t('home.featuredProjects.subtitle') }}</p>
        </div>
        <UButton to="/projects" variant="ghost" trailing-icon="i-lucide-arrow-right" class="shrink-0 self-start md:self-auto group">
          {{ t('home.cta.viewProjects') }}
        </UButton>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr">
        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          :class="[
            index === 0 ? 'md:col-span-2 md:row-span-1' : '',
          ]"
        >
          <ProjectCard :project="project" :class="{ 'h-full': true }" />
        </div>
      </div>
    </div>
  </section>
</template>
