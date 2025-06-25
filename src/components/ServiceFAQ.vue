<template>
  <section class="faq-section">
    <div class="container">
      <div class="faq-header text-center mb-2xl">
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>

      <div class="faq-grid">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item" :class="{ 'active': activeIndex === index }">
          <button class="faq-question" @click="toggleFAQ(index)" :aria-expanded="activeIndex === index">
            <span class="question-text">{{ faq.question }}</span>
            <svg class="faq-icon" :class="{ 'rotated': activeIndex === index }" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
              </path>
            </svg>
          </button>

          <div class="faq-answer" :class="{ 'open': activeIndex === index }">
            <div class="answer-content">
              <p v-html="faq.answer"></p>
              <div v-if="faq.features" class="faq-features">
                <h4>{{ t('faq.keyPoints') }}</h4>
                <ul>
                  <li v-for="feature in faq.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

interface FAQ {
  question: string
  answer: string
  features?: string[]
}

interface Props {
  title: string
  subtitle: string
  faqs: FAQ[]
  ctaTitle: string
  ctaSubtitle: string
  ctaText: string
  ctaLink: string
}

defineProps<Props>()

const activeIndex = ref<number | null>(null)

const toggleFAQ = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
@import './styles/ServiceFAQ.css';
</style>
