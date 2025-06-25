<template>
  <section class="section">
    <div class="container">
      <SectionCTA :question="t('home.cta2.title')" :description="t('home.cta2.subtitle')"
        :primary-text="t('home.cta2.startProject')" primary-link="/contact" :secondary-text="t('home.cta2.learnMore')"
        secondary-link="/about" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import SectionCTA from '@/components/shared/SectionCTA.vue'

const { t } = useI18n()
</script>
