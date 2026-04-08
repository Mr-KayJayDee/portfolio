<script setup lang="ts">
import { techStack } from '~/data/techstack'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.about.title'),
  description: () => t('seo.about.description'),
  ogTitle: () => t('seo.about.title'),
  ogDescription: () => t('seo.about.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})

const techCategories = computed(() => [
  {
    key: 'programming' as const,
    title: t('about.skills.programming'),
    icon: 'i-lucide-code-2',
  },
  {
    key: 'front' as const,
    title: t('about.skills.frontend'),
    icon: 'i-lucide-palette',
  },
  {
    key: 'database' as const,
    title: t('about.skills.backend'),
    icon: 'i-lucide-database',
  },
  {
    key: 'devtools' as const,
    title: t('about.skills.tools'),
    icon: 'i-lucide-settings',
  },
])

const approachCards = computed(() => [
  {
    title: t('about.approach.performance.title'),
    description: t('about.approach.performance.description'),
    icon: 'i-lucide-zap',
  },
  {
    title: t('about.approach.architecture.title'),
    description: t('about.approach.architecture.description'),
    icon: 'i-lucide-git-branch',
  },
  {
    title: t('about.approach.quality.title'),
    description: t('about.approach.quality.description'),
    icon: 'i-lucide-check-circle',
  },
  {
    title: t('about.approach.collaboration.title'),
    description: t('about.approach.collaboration.description'),
    icon: 'i-lucide-users',
  },
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-6">
          {{ t('about.title') }}
        </h1>
        <p class="text-xl text-muted mb-8">
          {{ t('about.subtitle') }}
        </p>
        <div class="space-y-4 text-lg text-muted max-w-3xl mx-auto">
          <p>{{ t('about.intro.content') }}</p>
          <p>{{ t('about.experience.content') }}</p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">{{ t('about.skills.title') }}</h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            {{ t('about.subtitle') }}
          </p>
        </div>

        <!-- Tech Categories Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UCard v-for="category in techCategories" :key="category.key">
            <div class="flex items-center gap-3 mb-4">
              <UIcon :name="category.icon" class="text-2xl text-primary" />
              <h3 class="text-xl font-bold">{{ category.title }}</h3>
            </div>
            <div class="flex flex-wrap gap-3">
              <TechBadge
                v-for="tech in techStack[category.key]"
                :key="tech.name"
                :tech="tech"
                :show-level="true"
              />
            </div>
          </UCard>
        </div>

        <!-- Operating Systems -->
        <UCard>
          <div class="flex items-center gap-3 mb-4">
            <UIcon name="i-lucide-monitor" class="text-2xl text-primary" />
            <h3 class="text-xl font-bold">{{ t('about.skills.systems') }}</h3>
          </div>
          <div class="flex flex-wrap gap-3">
            <TechBadge
              v-for="tech in techStack.operating_systems"
              :key="tech.name"
              :tech="tech"
              :show-level="false"
            />
          </div>
        </UCard>
      </div>
    </section>

    <!-- Approach Section -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">{{ t('about.approach.title') }}</h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            {{ t('about.approach.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="(card, index) in approachCards" :key="index">
            <div class="flex items-start gap-4">
              <UIcon :name="card.icon" class="text-2xl text-primary shrink-0 mt-1" />
              <div>
                <h3 class="text-lg font-bold mb-2">{{ card.title }}</h3>
                <p class="text-muted">{{ card.description }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">{{ t('about.cta.title') }}</h2>
        <p class="text-lg text-muted mb-8">{{ t('about.cta.description') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton to="/contact" size="lg">
            {{ t('about.cta.button') }}
          </UButton>
          <UButton to="/projects" size="lg" variant="outline">
            {{ t('home.cta.viewProjects') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
