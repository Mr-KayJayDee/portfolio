<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">{{ t('hytale.hero.label') }}</span>
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mt-4">
        <span class="bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-400 bg-clip-text text-transparent">{{ t('hytale.hero.title') }}</span>
      </h1>
      <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
        {{ t('hytale.hero.subtitle') }}
      </p>
    </div>
  </section>
</template>
