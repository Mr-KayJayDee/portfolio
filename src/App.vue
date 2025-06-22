<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { watch, nextTick } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()

// Initialize theme
useTheme()

// Force scroll to top on route change (backup solution)
watch(() => route.fullPath, () => {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  })
})
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="flex-grow">
      <RouterView v-slot="{ Component }" :key="$route.fullPath">
        <transition mode="out-in" enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform opacity-0" enter-to-class="transform opacity-100"
          leave-active-class="transition duration-200 ease-in" leave-from-class="transform opacity-100"
          leave-to-class="transform opacity-0">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>

    <AppFooter />
  </div>
</template>

<style>
/* Remove default margins */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Focus styles */
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>
