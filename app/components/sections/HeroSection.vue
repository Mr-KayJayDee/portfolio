<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="py-20 md:py-32">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        {{ t('home.title') }}
      </h1>
      <p class="text-xl md:text-2xl text-muted mb-10">
        {{ t('home.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton to="/projects" size="xl" icon="i-lucide-arrow-right" trailing>
          {{ t('home.cta.viewProjects') }}
        </UButton>
        <UButton to="/fiverr" size="xl" variant="outline" icon="i-lucide-dollar-sign" trailing>
          {{ t('nav.fiverr') }}
        </UButton>
        <UButton to="/contact" size="xl" variant="outline" icon="i-lucide-message-circle" trailing>
          {{ t('home.cta.contactMe') }}
        </UButton>
      </div>
    </div>
  </section>
</template>
