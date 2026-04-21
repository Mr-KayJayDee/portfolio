export default defineNuxtConfig({
  compatibilityDate: '2026-04-21',
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
    '@nuxt/image',
    '@nuxt/content'
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
    classSuffix: ''
  },
  site: {
    url: 'https://killiandalcin.fr',
    name: "Killian' DAL-CIN - Developpeur Full Stack"
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
},
  routeRules: {
    '/blog/**': { redirect: { to: '/fr/blog/**', statusCode: 301 } },
  },
  vite: {
    optimizeDeps: {
      include: ['zod'],
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['kotlin', 'java', 'typescript', 'shell', 'bash', 'json', 'vue', 'html', 'css']
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  }
})
