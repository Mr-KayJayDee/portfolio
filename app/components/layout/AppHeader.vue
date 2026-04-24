<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const colorMode = useColorMode()
const route = useRoute()
const mobileOpen = ref(false)

const navLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'hytale', path: '/hytale' },
  { key: 'blog', path: '/blog' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
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
  <header
    class="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" :aria-label="t('a11y.logoLabel')" class="flex items-center gap-2.5 shrink-0">
          <NuxtImg
src="/images/logo.webp" alt="Killian' DAL-CIN" width="36" height="36" loading="eager"
            class="rounded-lg" />
          <span class="text-base font-semibold tracking-tight text-gray-900 dark:text-white">Killian'</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
          <NuxtLink
v-for="link in navLinks" :key="link.key" :to="localePath(link.path)"
            :aria-current="isActive(link.path) ? 'page' : undefined"
            class="px-3 py-2 text-sm font-medium rounded-lg transition-colors" :class="[
              isActive(link.path)
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
            ]">
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-1">
          <!-- Language toggle -->
          <UButton variant="ghost" color="neutral" size="sm" :aria-label="t('a11y.langToggle')" @click="toggleLocale">
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </UButton>

          <!-- Theme toggle -->
          <UButton
variant="ghost" color="neutral" size="sm"
            :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            :aria-label="colorMode.value === 'dark' ? t('a11y.themeDark') : t('a11y.themeLight')"
            @click="toggleTheme" />

          <!-- Mobile hamburger -->
          <UButton
variant="ghost" color="neutral" size="sm" icon="i-lucide-menu" class="md:hidden"
            :aria-label="t('a11y.openMenu')" @click="mobileOpen = true" />
        </div>
      </div>
    </div>

    <!-- Mobile slideover -->
    <USlideover v-model:open="mobileOpen" side="left" class="md:hidden">
      <template #header>
        <div class="flex items-center gap-2.5">
          <NuxtImg src="/images/logo.webp" alt="Killian' DAL-CIN" width="32" height="32" class="rounded-lg" />
          <span class="text-base font-semibold text-gray-900 dark:text-white">Killian</span>
        </div>
      </template>

      <template #body>
        <nav class="flex flex-col gap-1" aria-label="Mobile navigation">
          <NuxtLink
v-for="link in navLinks" :key="link.key" :to="localePath(link.path)"
            :aria-current="isActive(link.path) ? 'page' : undefined"
            class="px-4 py-3 text-base font-medium rounded-lg transition-colors" :class="[
              isActive(link.path)
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
            ]" @click="mobileOpen = false">
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
        </nav>
      </template>

      <template #footer>
        <div class="flex items-center gap-2">
          <UButton variant="ghost" color="neutral" :aria-label="t('a11y.langToggle')" @click="toggleLocale">
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </UButton>
          <UButton
variant="ghost" color="neutral" :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            :aria-label="colorMode.value === 'dark' ? t('a11y.themeDark') : t('a11y.themeLight')"
            @click="toggleTheme" />
        </div>
      </template>
    </USlideover>
  </header>
</template>
