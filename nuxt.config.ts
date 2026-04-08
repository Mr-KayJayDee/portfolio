export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/image'
  ],
  typescript: {
    strict: true
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr'
  },
  gtag: {
    id: 'G-CDVVNFY6MV',
    enabled: false
  }
})
