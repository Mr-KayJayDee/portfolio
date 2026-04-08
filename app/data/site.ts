import type { SiteConfig, ContactInfo, SocialLink, FiverrService, FiverrConfig } from '~~/shared/types'

export type { SiteConfig, ContactInfo, SocialLink, FiverrService, FiverrConfig }

export const siteConfig: SiteConfig = {
  name: 'Killian',
  title: "Killian' DAL-CIN - Full Stack Developer | Vue.js, React, Node.js Expert",
  description:
    'Professional Full Stack Developer specializing in modern web development with Vue.js, React, Node.js. Expert in Discord bots, web applications, and custom software solutions.',
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

  fiverr: {
    profileUrl: 'https://www.fiverr.com/users/mr_kayjaydee',
    services: [
      {
        id: 'discord-bot',
        url: 'https://www.fiverr.com/s/rEDa84j',
        image: '/images/fiverr/discord_bot.webp',
        price: '$25',
      },
      {
        id: 'minecraft-plugin',
        url: 'https://www.fiverr.com/s/xXVY20Q',
        image: '/images/fiverr/minecraft_plugin.webp',
        price: '$50',
      },
      {
        id: 'telegram-bot',
        url: '#',
        image: '/images/fiverr/telegram_bot.webp',
        price: '$20',
      },
      {
        id: 'website-development',
        url: '#',
        image: '/images/fiverr/website.webp',
        price: '$50',
      },
    ],
  },

  seo: {
    defaultImage: '/portfolio-preview.webp',
    twitterHandle: '@killiandalcin',
    locale: 'en_US',
    alternateLocales: ['fr_FR'],
    internalLinks: {
      priority: [
        { url: '/fiverr', text: 'Services Fiverr', priority: 0.9 },
        { url: '/projects', text: 'Portfolio', priority: 0.8 },
        { url: '/contact', text: 'Contact', priority: 0.8 },
      ],
      services: [
        { url: '/fiverr#discord-bot', text: 'Bot Discord' },
        { url: '/fiverr#minecraft-plugin', text: 'Plugin Minecraft' },
        { url: '/fiverr#telegram-bot', text: 'Bot Telegram' },
        { url: '/fiverr#website-development', text: 'Developpement Web' },
      ],
    },
    organization: {
      '@type': 'ProfessionalService',
      name: "Killian' DAL-CIN - Developpeur Full Stack",
      logo: 'https://killiandalcin.fr/logo.webp',
      priceRange: '$$$',
      aggregateRating: {
        ratingValue: '5',
        reviewCount: '50',
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
