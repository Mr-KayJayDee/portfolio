export default defineNuxtConfig({
  compatibilityDate: '2026-04-21',
  ssr: true,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  typescript: {
    strict: true,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storage: 'cookie',
    storageKey: 'nuxt-color-mode',
    classSuffix: '',
  },
  site: {
    url: 'https://killiandalcin.fr',
    name: "Killian' DAL-CIN - Developpeur Full Stack",
  },
  i18n: {
    strategy: 'prefix',
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
    enabled: !import.meta.dev,
  },
  routeRules: {
    '/blog': { redirect: { to: '/fr/blog', statusCode: 301 } },
    '/blog/**': { redirect: { to: '/fr/blog', statusCode: 301 } },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['kotlin', 'java', 'typescript', 'shell', 'bash', 'json', 'vue', 'html', 'css'],
        },
      },
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['zod'],
    },
  },
})
