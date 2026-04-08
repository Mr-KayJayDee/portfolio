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
  <section class="py-16 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">{{ title }}</h2>
        <p class="text-lg text-muted">{{ subtitle }}</p>
      </div>
      <UAccordion :items="items" type="single" collapsible />
    </div>
  </section>
</template>
