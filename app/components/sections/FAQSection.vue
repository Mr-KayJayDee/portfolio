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
  <section class="py-20 md:py-28 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-14">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">FAQ</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ title }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-3">{{ subtitle }}</p>
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
        <UAccordion :items="items" type="single" collapsible />
      </div>
    </div>
  </section>
</template>
