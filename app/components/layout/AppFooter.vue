<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const socialLinks = [
  { name: 'gitea', url: 'https://gitea.kamisama.ovh/kayjaydee', icon: 'simple-icons:gitea', ariaKey: 'a11y.gitea' },
  { name: 'linkedin', url: 'https://linkedin.com/in/killian-dal-cin', icon: 'simple-icons:linkedin', ariaKey: 'a11y.linkedin' },
]

const quickLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
])
</script>

<template>
  <footer class="border-t border-gray-200/80 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-950/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <!-- Brand column -->
        <div class="sm:col-span-2 lg:col-span-1 space-y-5">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5 group">
            <NuxtImg
src="/images/logo.webp" alt="Killian' DAL-CIN" width="36" height="36" loading="lazy"
              class="rounded-lg transition-transform duration-300 group-hover:scale-110" />
            <span class="text-lg font-bold text-gray-900 dark:text-white">Killian' DAL-CIN</span>
          </NuxtLink>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            Full Stack Developer &amp; Hytale Plugin Developer. Building modern web experiences and game plugins.
          </p>
        </div>

        <!-- Navigation links -->
        <div>
          <h3 class="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
            Navigation
          </h3>
          <nav class="flex flex-col gap-3">
            <NuxtLink
v-for="link in quickLinks" :key="link.key" :to="localePath(link.path)"
              class="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200">
              {{ t(`nav.${link.key}`) }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Services links -->
        <div>
          <h3 class="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
            Services
          </h3>
          <nav class="flex flex-col gap-3">
            <span class="text-sm text-gray-600 dark:text-gray-400">Web Development</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Hytale Plugins</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Consulting</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Maintenance</span>
          </nav>
        </div>

        <!-- Connect -->
        <div>
          <h3 class="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
            Connect
          </h3>
          <div class="flex items-center gap-2">
            <a
v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer"
              :aria-label="t(link.ariaKey)"
              class="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-gray-200/80 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/40 hover:border-brand-500/40 hover:bg-brand-500/10 dark:hover:bg-brand-500/10 transition-all duration-300 group">
              <UIcon
:name="link.icon"
                class="w-4.5 h-4.5 text-gray-500 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-14 pt-8 border-t border-gray-200/60 dark:border-gray-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-400 dark:text-gray-500 font-mono">
          {{ t('footer.copyright') }}
        </p>
        <div class="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-600">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span>Built with Nuxt</span>
        </div>
      </div>
    </div>
  </footer>
</template>
