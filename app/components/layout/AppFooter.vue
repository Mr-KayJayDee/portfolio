<script setup lang="ts">
const { t } = useI18n()

const socialLinks = [
  { name: 'gitea', url: 'https://gitea.kamisama.ovh/kayjaydee', icon: 'simple-icons:gitea', ariaKey: 'a11y.gitea' },
  { name: 'linkedin', url: 'https://linkedin.com/in/killian-dal-cin', icon: 'simple-icons:linkedin', ariaKey: 'a11y.linkedin' },
  { name: 'fiverr', url: 'https://www.fiverr.com/users/mr_kayjaydee', icon: 'simple-icons:fiverr', ariaKey: 'a11y.fiverr' },
]
</script>

<template>
  <footer class="py-6 bg-gray-100 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ t('footer.copyright') }}
      </p>

      <div class="flex items-center gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t(link.ariaKey)"
          class="min-w-11 min-h-11 inline-flex items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
        >
          <UIcon :name="link.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors duration-150" />
        </a>
      </div>
    </div>
  </footer>
</template>
