<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-4 bg-white dark:bg-gray-950 relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl" />
      <!-- Dot grid -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 32px 32px;" />
    </div>

    <div class="relative z-10 text-center space-y-8 max-w-lg">
      <!-- Error code -->
      <div class="relative">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// error</span>
        <h1 class="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent select-none mt-2">
          {{ error.statusCode }}
        </h1>
        <!-- Shadow glow behind -->
        <span class="absolute inset-0 top-8 text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter text-brand-500/8 blur-md select-none" aria-hidden="true">
          {{ error.statusCode }}
        </span>
      </div>

      <div class="space-y-3">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {{ error.statusCode === 404 ? t('error.notFound') : t('error.generic') }}
        </p>
        <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
          {{ error.statusCode === 404
            ? 'The page you are looking for does not exist or has been moved.'
            : 'Something unexpected happened. Please try again.'
          }}
        </p>
      </div>

      <UButton size="xl" icon="i-lucide-home" class="font-semibold" trailing-icon="i-lucide-arrow-right" @click="handleError">
        {{ t('error.backHome') }}
      </UButton>
    </div>
  </div>
</template>
