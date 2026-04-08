<script setup lang="ts">
import { techStack } from '~/data/techstack'

const { t } = useI18n()
const localePath = useLocalePath()

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
    <section class="pt-16 pb-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-4xl mx-auto text-center">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">About</span>
        <h1 class="text-4xl sm:text-5xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
          {{ t('about.title') }}
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {{ t('about.subtitle') }}
        </p>
        <div class="space-y-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          <p>{{ t('about.intro.content') }}</p>
          <p>{{ t('about.experience.content') }}</p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Tech Stack</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('about.skills.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            {{ t('about.subtitle') }}
          </p>
        </div>

        <!-- Tech Categories Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div
            v-for="category in techCategories"
            :key="category.key"
            class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center">
                <UIcon :name="category.icon" class="text-xl text-brand-600 dark:text-brand-400" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.title }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <TechBadge
                v-for="tech in techStack[category.key]"
                :key="tech.name"
                :tech="tech"
                :show-level="true"
              />
            </div>
          </div>
        </div>

        <!-- Operating Systems -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center">
              <UIcon name="i-lucide-monitor" class="text-xl text-brand-600 dark:text-brand-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('about.skills.systems') }}</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <TechBadge
              v-for="tech in techStack.operating_systems"
              :key="tech.name"
              :tech="tech"
              :show-level="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Approach Section -->
    <section class="py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">Methodology</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('about.approach.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            {{ t('about.approach.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(card, index) in approachCards"
            :key="index"
            class="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0 transition-colors group-hover:bg-brand-500/20">
                <UIcon :name="card.icon" class="text-xl text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ card.title }}</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-28 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" aria-hidden="true" />
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" aria-hidden="true" />

          <div class="relative z-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ t('about.cta.title') }}</h2>
            <p class="text-lg text-white/80 mb-10 max-w-2xl mx-auto">{{ t('about.cta.description') }}</p>
            <div class="flex flex-wrap justify-center gap-4">
              <UButton :to="localePath('/contact')" size="xl" color="white" class="font-semibold">
                {{ t('about.cta.button') }}
              </UButton>
              <UButton :to="localePath('/projects')" size="xl" variant="outline" color="white" class="font-semibold">
                {{ t('home.cta.viewProjects') }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
