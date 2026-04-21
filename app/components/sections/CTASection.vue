<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface Props {
  title?: string
  subtitle?: string
  primaryText?: string
  primaryTo?: string
  secondaryText?: string
  secondaryTo?: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  primaryText: '',
  primaryTo: '/contact',
  secondaryText: '',
  secondaryTo: '/about',
  external: false,
})

const resolvedTitle = computed(() => props.title || t('home.cta2.title'))
const resolvedSubtitle = computed(() => props.subtitle || t('home.cta2.subtitle'))
const resolvedPrimaryText = computed(() => props.primaryText || t('home.cta2.startProject'))
const resolvedSecondaryText = computed(() => props.secondaryText || t('home.cta2.learnMore'))
</script>

<template>
  <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="relative overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24 text-center border border-gray-200/60 dark:border-gray-800/40 bg-gray-50 dark:bg-gray-900">
        <!-- Subtle dot pattern -->
        <div
class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" aria-hidden="true"
          style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 24px 24px;" />
        <!-- Brand glow -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/8 dark:bg-brand-500/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div class="relative z-10">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">{{ resolvedTitle }}</h2>
          <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">{{ resolvedSubtitle }}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              :to="external ? props.primaryTo : localePath(props.primaryTo)"
              :target="external ? '_blank' : undefined"
              :rel="external ? 'noopener noreferrer' : undefined"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
            >
              {{ resolvedPrimaryText }}
              <UIcon :name="external ? 'i-lucide-external-link' : 'i-lucide-arrow-right'" class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink
              :to="localePath(props.secondaryTo)"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand-500/50 hover:text-brand-500 font-semibold text-sm transition-all duration-200"
            >
              {{ resolvedSecondaryText }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
