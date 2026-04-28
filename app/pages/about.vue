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
    <section class="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// about</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
          {{ t('about.title') }}
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {{ t('about.subtitle') }}
        </p>
        <div class="max-w-3xl mx-auto space-y-6">
          <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-6 sm:p-8 text-left">{{ t('about.intro.content') }}</p>
          <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm p-6 sm:p-8 text-left">{{ t('about.experience.content') }}</p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// tech-stack</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('about.skills.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            {{ t('about.subtitle') }}
          </p>
        </div>

        <!-- Tech Categories Bento Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div
            v-for="category in techCategories"
            :key="category.key"
            class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
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
        <div class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
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
    <section class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// methodology</span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('about.approach.title') }}</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            {{ t('about.approach.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="(card, index) in approachCards"
            :key="index"
            class="group rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1"
          >
            <!-- Hover glow -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/0 to-emerald-500/0 group-hover:from-brand-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none" aria-hidden="true" />

            <div class="relative z-10 flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
                <UIcon :name="card.icon" class="text-xl text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{{ card.title }}</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTASection
      :title="t('about.cta.title')"
      :subtitle="t('about.cta.description')"
      :primary-text="t('about.cta.button')"
      :primary-to="localePath('/contact')"
      :secondary-text="t('home.cta.viewProjects')"
      :secondary-to="localePath('/projects')"
    />
  </div>
</template>
