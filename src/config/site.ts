export interface SocialLink {
  name: string
  url: string
  icon: string
  username?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface FiverrService {
  id: string
  url: string
  image: string
  price: string
}

export interface FiverrConfig {
  profileUrl: string
  services: FiverrService[]
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  author: string
  contact: ContactInfo
  social: SocialLink[]
  fiverr: FiverrConfig
  url: string
  seo: {
    defaultImage: string
    twitterHandle: string
    locale: string
    alternateLocales: string[]
    internalLinks: {
      priority: { url: string; text: string; priority: number }[]
      services: { url: string; text: string }[]
    }
    organization: {
      '@type': string
      name: string
      logo: string
      priceRange: string
      aggregateRating: {
        ratingValue: string
        reviewCount: string
      }
    }
  }
  performance: {
    enablePrefetch: boolean
    enablePreconnect: boolean
    criticalCSS: boolean
    lazyLoadImages: boolean
    webpSupport: boolean
  }
}

export const siteConfig: SiteConfig = {
  name: 'Killian',
  title: 'Killian - Full Stack Developer | Vue.js, React, Node.js Expert',
  description: 'Professional Full Stack Developer specializing in modern web development with Vue.js, React, Node.js. Expert in Discord bots, web applications, and custom software solutions.',
  author: 'Killian',
  url: 'https://killiandalcin.fr',

  contact: {
    email: 'contact@killiandalcin.fr',
    phone: '+33 6 49 19 38 16',
    location: 'France'
  },

  social: [
    {
      name: 'Gitea',
      url: 'https://gitea.kamisama.ovh/kayjaydee',
      icon: 'github',
      username: 'kayjaydee'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/killian-dal-cin',
      icon: 'linkedin',
      username: 'killian-dalcin'
    },
    {
      name: 'Discord',
      url: 'https://discord.com/users/370940770225618954',
      icon: 'discord',
      username: 'kayjaydee'
    },
    {
      name: 'Email',
      url: 'mailto:contact@killiandalcin.fr',
      icon: 'email'
    }
  ],

  fiverr: {
    profileUrl: 'https://www.fiverr.com/users/mr_kayjaydee',
    services: [
      {
        id: 'discord-bot',
        url: 'https://www.fiverr.com/s/rEDa84j',
        image: '@/assets/images/fiverr/discord_bot.webp',
        price: '$25'
      },
      {
        id: 'minecraft-plugin',
        url: 'https://www.fiverr.com/s/xXVY20Q',
        image: '@/assets/images/fiverr/minecraft_plugin.webp',
        price: '$50'
      },
      {
        id: 'telegram-bot',
        url: '#',
        image: '@/assets/images/fiverr/telegram_bot.webp',
        price: '$20'
      },
      {
        id: 'website-development',
        url: '#',
        image: '@/assets/images/fiverr/website.webp',
        price: '$50'
      }
    ]
  },

  seo: {
    defaultImage: '/portfolio-preview.webp',
    twitterHandle: '@killiandalcin',
    locale: 'fr_FR',
    alternateLocales: ['en_US'],
    internalLinks: {
      priority: [
        { url: '/fiverr', text: 'Services Fiverr', priority: 0.9 },
        { url: '/projects', text: 'Portfolio', priority: 0.8 },
        { url: '/contact', text: 'Contact', priority: 0.8 }
      ],
      services: [
        { url: '/fiverr#discord-bot', text: 'Bot Discord' },
        { url: '/fiverr#minecraft-plugin', text: 'Plugin Minecraft' },
        { url: '/fiverr#telegram-bot', text: 'Bot Telegram' },
        { url: '/fiverr#website-development', text: 'Développement Web' }
      ]
    },
    organization: {
      '@type': 'ProfessionalService',
      name: 'Killian Dalcin - Développeur Full Stack',
      logo: 'https://killiandalcin.fr/logo.webp',
      priceRange: '€€€',
      aggregateRating: {
        ratingValue: '5',
        reviewCount: '50'
      }
    }
  },

  performance: {
    enablePrefetch: true,
    enablePreconnect: true,
    criticalCSS: true,
    lazyLoadImages: true,
    webpSupport: true
  }
}
