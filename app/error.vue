<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
    <h1 class="text-8xl font-bold text-primary">{{ error.statusCode }}</h1>
    <p class="text-xl text-gray-500 dark:text-gray-400 text-center max-w-md">
      {{ error.statusCode === 404 ? t('error.notFound') : t('error.generic') }}
    </p>
    <UButton size="lg" @click="handleError">
      {{ t('error.backHome') }}
    </UButton>
  </div>
</template>
