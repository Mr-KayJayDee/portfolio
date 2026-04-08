<script setup lang="ts">
import type { FAQ } from '~~/shared/types'

interface Props {
  faqs: FAQ[]
  title: string
  subtitle: string
}

const props = defineProps<Props>()
const { t } = useI18n()

const items = computed(() =>
  props.faqs.map((faq) => ({
    label: t(faq.questionKey),
    content: t(faq.answerKey),
    value: faq.questionKey,
  })),
)
</script>

<template>
  <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-16">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// faq</span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ title }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">{{ subtitle }}</p>
      </div>

      <div class="rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-3 sm:p-4 shadow-sm">
        <UAccordion :items="items" type="single" collapsible />
      </div>
    </div>
  </section>
</template>
