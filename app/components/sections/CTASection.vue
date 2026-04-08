<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="py-20 md:py-28 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-500 px-8 py-16 sm:px-16 sm:py-20 text-center">
        <!-- Decorative shapes -->
        <div class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" aria-hidden="true" />
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" aria-hidden="true" />

        <div class="relative z-10">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ t('home.cta2.title') }}</h2>
          <p class="text-lg text-white/80 mb-10 max-w-2xl mx-auto">{{ t('home.cta2.subtitle') }}</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton :to="localePath('/contact')" size="xl" color="white" class="font-semibold">
              {{ t('home.cta2.startProject') }}
            </UButton>
            <UButton :to="localePath('/about')" size="xl" variant="outline" color="white" class="font-semibold">
              {{ t('home.cta2.learnMore') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
