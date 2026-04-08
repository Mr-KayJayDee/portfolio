<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="py-16 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">{{ t('home.cta2.title') }}</h2>
      <p class="text-lg text-muted mb-8">{{ t('home.cta2.subtitle') }}</p>
      <div class="flex gap-4 justify-center">
        <UButton to="/contact" size="lg">
          {{ t('home.cta2.startProject') }}
        </UButton>
        <UButton to="/about" size="lg" variant="outline">
          {{ t('home.cta2.learnMore') }}
        </UButton>
      </div>
    </div>
  </section>
</template>
