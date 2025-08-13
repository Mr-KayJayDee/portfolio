<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import { useSeo } from '@/composables/useSeo'

const { t } = useI18n()

useSeo({
  title: t('seo.notFound.title'),
  description: t('seo.notFound.description')
})
</script>

<template>
  <main class="page-enter min-h-screen flex flex-col items-center justify-center text-center p-4">
    <h1 class="text-5xl font-bold mb-4">{{ t('notFound.title') }}</h1>
    <p class="mb-8 text-xl text-secondary">{{ t('notFound.description') }}</p>
    <router-link to="/" class="btn btn-primary">{{ t('notFound.goHome') }}</router-link>
  </main>
</template>
