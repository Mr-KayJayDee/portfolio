export default defineNuxtConfig({
  compatibilityDate: '2026-04-21',
  ssr: true,
  // Workaround for nuxt/nuxt#33987: esbuild zombie from fontless (@nuxt/ui → @nuxt/fonts)
  // keeps the Node process alive after "Build complete!", causing Docker builds to hang.
  hooks: {
    close: () => {
      process.exit(0)
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
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
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  i18n: {
    strategy: 'prefix',
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
      redirectOn: 'no prefix',
      fallbackLocale: 'fr',
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
