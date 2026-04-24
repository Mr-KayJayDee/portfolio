import type { SiteConfig, ContactInfo, SocialLink } from '~~/shared/types'

export type { SiteConfig, ContactInfo, SocialLink }

export const siteConfig: SiteConfig = {
  name: 'Killian',
  title: "Killian' DAL-CIN - Hytale Plugin Developer | Freelance",
  description:
    'Hytale Plugin Developer & Web Developer. Custom Java plugins for Hytale servers, gaming websites, Discord bots, and full-stack web applications.',
  jobTitle: 'Hytale Plugin Developer',
  author: 'Killian',
  url: 'https://killiandalcin.fr',

  contact: {
    email: 'contact@killiandalcin.fr',
    location: 'France',
  },

  social: [
    {
      name: 'Gitea',
      url: 'https://gitea.kamisama.ovh/kayjaydee',
      icon: 'i-simple-icons-gitea',
      username: 'kayjaydee',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/killian-dal-cin',
      icon: 'i-simple-icons-linkedin',
      username: 'killian-dalcin',
    },
    {
      name: 'Discord',
      url: 'https://discord.com/users/370940770225618954',
      icon: 'i-simple-icons-discord',
      username: 'kayjaydee',
    },
    {
      name: 'Email',
      url: 'mailto:contact@killiandalcin.fr',
      icon: 'i-lucide-mail',
    },
  ],

  seo: {
    defaultImage: '/portfolio-preview.webp',
    twitterHandle: '@killiandalcin',
    locale: 'en_US',
    alternateLocales: ['fr_FR'],
    internalLinks: {
      priority: [
        { url: '/hytale', text: 'Hytale Plugin Development', priority: 0.9 },
        { url: '/projects', text: 'Portfolio', priority: 0.8 },
        { url: '/contact', text: 'Contact', priority: 0.8 },
      ],
      services: [
        { url: '/hytale#pricing', text: 'Hytale Pricing' },
        { url: '/hytale', text: 'Custom Plugin Development' },
        { url: '/contact', text: 'Request a Quote' },
      ],
    },
    organization: {
      '@type': 'ProfessionalService',
      name: "Killian' DAL-CIN - Hytale Plugin Developer",
      logo: 'https://killiandalcin.fr/logo.webp',
      priceRange: '$$$',
      aggregateRating: {
        ratingValue: '5',
        reviewCount: '5',
      },
    },
  },

  performance: {
    enablePrefetch: true,
    enablePreconnect: true,
    criticalCSS: true,
    lazyLoadImages: true,
    webpSupport: true,
  },
}
