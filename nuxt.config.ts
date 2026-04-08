export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/image'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  typescript: {
    strict: true
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storage: 'cookie',
    storageKey: 'nuxt-color-mode',
    cookieName: 'nuxt-color-mode',
    classSuffix: ''
  },
  site: {
    url: 'https://killiandalcin.fr',
    name: 'Killian Dalcin - Developpeur Full Stack'
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    baseUrl: 'https://killiandalcin.fr',
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
    smtpHost: '',
    smtpUser: '',
    smtpPass: '',
    smtpTo: '',
    public: {
      gtag: {
        id: '',
      },
    },
  },
  gtag: {
    id: '',
    enabled: import.meta.env.NODE_ENV === 'production',
  }
})
