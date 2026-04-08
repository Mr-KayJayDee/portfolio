<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const setLocale = useSetLocale()
const colorMode = useColorMode()
const route = useRoute()
const drawerOpen = ref(false)

const navLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'fiverr', path: '/fiverr' },
  { key: 'formation', path: '/formation' },
])

function toggleLocale() {
  setLocale(locale.value === 'fr' ? 'en' : 'fr')
}

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function isActive(path: string): boolean {
  return route.path === localePath(path)
}
</script>

<template>
  <header class="sticky top-0 z-[1020] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" :aria-label="t('a11y.logoLabel')" class="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded">
        <NuxtImg src="/images/logo.webp" alt="Killian Dalcin" width="40" height="40" loading="eager" class="rounded" />
        <span class="text-lg font-semibold text-gray-900 dark:text-white">Killian</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="localePath(link.path)"
          :aria-current="isActive(link.path) ? 'page' : undefined"
          class="text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1 py-2"
          :class="[
            isActive(link.path)
              ? 'border-b-2 border-primary-500 text-gray-900 dark:text-white'
              : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
          ]"
        >
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <!-- Toggles -->
      <div class="flex items-center gap-1">
        <!-- Language toggle -->
        <button
          type="button"
          :aria-label="t('a11y.langToggle')"
          class="min-w-11 min-h-11 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded transition-colors"
          @click="toggleLocale"
        >
          {{ locale === 'fr' ? 'EN' : 'FR' }}
        </button>

        <!-- Theme toggle -->
        <button
          type="button"
          :aria-label="colorMode.value === 'dark' ? t('a11y.themeDark') : t('a11y.themeLight')"
          class="min-w-11 min-h-11 inline-flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded transition-colors duration-300"
          @click="toggleTheme"
        >
          <UIcon :name="colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'" class="w-5 h-5" />
        </button>

        <!-- Hamburger (mobile) -->
        <button
          type="button"
          :aria-label="t('a11y.openMenu')"
          class="md:hidden min-w-11 min-h-11 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded transition-colors"
          @click="drawerOpen = true"
        >
          <UIcon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <UDrawer v-model:open="drawerOpen" side="left">
      <div class="p-6 flex flex-col h-full">
        <!-- Close button -->
        <div class="flex justify-end mb-4">
          <button
            type="button"
            :aria-label="t('a11y.closeDrawer')"
            class="min-w-11 min-h-11 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded transition-colors"
            @click="drawerOpen = false"
          >
            <UIcon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Nav links -->
        <nav class="flex flex-col gap-2 flex-1" aria-label="Mobile navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="localePath(link.path)"
            :aria-current="isActive(link.path) ? 'page' : undefined"
            class="min-h-11 flex items-center px-4 py-3 text-base rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            :class="[
              isActive(link.path)
                ? 'text-primary-500 font-medium bg-primary-50 dark:bg-primary-900/20'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
            @click="drawerOpen = false"
          >
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
        </nav>

        <!-- Toggles at bottom -->
        <div class="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            :aria-label="t('a11y.langToggle')"
            class="min-w-11 min-h-11 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded transition-colors"
            @click="toggleLocale"
          >
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </button>

          <button
            type="button"
            :aria-label="colorMode.value === 'dark' ? t('a11y.themeDark') : t('a11y.themeLight')"
            class="min-w-11 min-h-11 inline-flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded transition-colors duration-300"
            @click="toggleTheme"
          >
            <UIcon :name="colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </UDrawer>
  </header>
</template>
