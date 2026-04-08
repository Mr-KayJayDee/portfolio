<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const socialLinks = [
  { name: 'gitea', url: 'https://gitea.kamisama.ovh/kayjaydee', icon: 'simple-icons:gitea', ariaKey: 'a11y.gitea' },
  { name: 'linkedin', url: 'https://linkedin.com/in/killian-dal-cin', icon: 'simple-icons:linkedin', ariaKey: 'a11y.linkedin' },
  { name: 'fiverr', url: 'https://www.fiverr.com/users/mr_kayjaydee', icon: 'simple-icons:fiverr', ariaKey: 'a11y.fiverr' },
]

const quickLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'fiverr', path: '/fiverr' },
])
</script>

<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        <!-- Branding & Tagline -->
        <div class="space-y-4">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
            <NuxtImg
              src="/images/logo.webp"
              alt="Killian Dalcin"
              width="36"
              height="36"
              loading="lazy"
              class="rounded-lg"
            />
            <span class="text-lg font-bold text-gray-900 dark:text-white">Killian Dalcin</span>
          </NuxtLink>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            Full Stack Developer &amp; Hytale Plugin Developer. Building modern web experiences and game plugins.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <nav class="flex flex-col gap-2.5">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.key"
              :to="localePath(link.path)"
              class="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              {{ t(`nav.${link.key}`) }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Social
          </h3>
          <div class="flex items-center gap-3">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t(link.ariaKey)"
              class="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-brand-500/10 dark:hover:bg-brand-500/10 transition-all duration-200 group"
            >
              <UIcon :name="link.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
        <p class="text-sm text-gray-400 dark:text-gray-500 text-center">
          {{ t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>
