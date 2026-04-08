<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-4 bg-white dark:bg-gray-950">
    <!-- Decorative background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 text-center space-y-6 max-w-lg">
      <!-- Error code with glitch-like styling -->
      <div class="relative">
        <h1 class="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter bg-gradient-to-b from-brand-500 to-brand-600 bg-clip-text text-transparent select-none">
          {{ error.statusCode }}
        </h1>
        <!-- Shadow text behind -->
        <span class="absolute inset-0 text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter text-brand-500/10 blur-sm select-none" aria-hidden="true">
          {{ error.statusCode }}
        </span>
      </div>

      <div class="space-y-3">
        <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {{ error.statusCode === 404 ? t('error.notFound') : t('error.generic') }}
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          {{ error.statusCode === 404
            ? 'The page you are looking for does not exist or has been moved.'
            : 'Something unexpected happened. Please try again.'
          }}
        </p>
      </div>

      <UButton size="xl" icon="i-lucide-home" class="font-semibold" @click="handleError">
        {{ t('error.backHome') }}
      </UButton>
    </div>
  </div>
</template>
