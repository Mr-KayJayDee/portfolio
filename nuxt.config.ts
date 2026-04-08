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
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', language: 'fr-FR', file: 'fr.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  runtimeConfig: {
    public: {
      gtag: {
        id: '',
      },
    },
  },
  gtag: {
    id: '',
    enabled: process.env.NODE_ENV === 'production',
  }
})
