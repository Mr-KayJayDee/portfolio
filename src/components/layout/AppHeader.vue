<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAssets } from '@/composables/useAssets'
import { useI18n } from '@/composables/useI18n'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { getImageUrl } = useAssets()
const { t } = useI18n()
const isMenuOpen = ref(false)

const navigation = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.projects'), path: '/projects' },
  { name: t('nav.about'), path: '/about' },
  { name: t('nav.contact'), path: '/contact' },
  { name: t('nav.fiverr'), path: '/fiverr' },
])

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header" role="banner">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <RouterLink to="/" class="logo" aria-label="Killian - Full Stack Developer Homepage">
          <img :src="getImageUrl('@/assets/images/logo.webp')" alt="Killian - Full Stack Developer Logo"
            class="logo-image" width="40" height="40" loading="eager">
          <span>Killian</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="nav hidden md:flex" role="navigation" aria-label="Main navigation">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.path" class="nav-link"
            :class="{ 'active': $route.path === item.path }"
            :aria-current="$route.path === item.path ? 'page' : undefined">
            {{ item.name }}
          </RouterLink>
        </nav>

        <!-- Right side controls -->
        <div class="header-actions">
          <!-- Language switcher -->
          <LanguageSwitcher />

          <!-- Theme toggle -->
          <ThemeToggle />

          <!-- Mobile menu button -->
          <button @click="toggleMenu" class="md:hidden btn btn-ghost p-2"
            :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'" :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="mobile-menu md:hidden" :class="{ 'open': isMenuOpen }" role="navigation"
      aria-label="Mobile navigation">
      <nav class="mobile-menu-nav">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.path" class="nav-link"
          @click="isMenuOpen = false" :aria-current="$route.path === item.path ? 'page' : undefined">
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '../styles/AppHeader.css';
</style>
