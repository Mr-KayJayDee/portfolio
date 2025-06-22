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
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <RouterLink to="/" class="logo">
          <img :src="getImageUrl('@/assets/images/logo.png')" alt="Killian" class="logo-image">
          <span>Killian</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="nav hidden md:flex">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.path" class="nav-link"
            :class="{ 'active': $route.path === item.path }">
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
          <button @click="toggleMenu" class="md:hidden btn btn-ghost p-2" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-menu md:hidden" :class="{ 'open': isMenuOpen }">
      <nav class="mobile-menu-nav">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.path" class="nav-link"
          @click="isMenuOpen = false">
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '../styles/AppHeader.css';
</style>
