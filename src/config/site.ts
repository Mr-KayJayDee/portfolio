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
}

export const siteConfig: SiteConfig = {
  name: 'Killian',
  title: 'Killian - Full Stack Developer | Vue.js, React, Node.js Expert',
  description: 'Professional Full Stack Developer specializing in modern web development with Vue.js, React, Node.js. Expert in Discord bots, web applications, and custom software solutions.',
  author: 'Killian',

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
        image: '@/assets/images/fiverr/discord_bot.jpg',
        price: '$25'
      },
      {
        id: 'minecraft-plugin',
        url: 'https://www.fiverr.com/s/xXVY20Q',
        image: '@/assets/images/fiverr/minecraft_plugin.jpg',
        price: '$50'
      },
      {
        id: 'telegram-bot',
        url: '#',
        image: '@/assets/images/fiverr/telegram_bot.jpg',
        price: '$20'
      },
      {
        id: 'website-development',
        url: '#',
        image: '@/assets/images/fiverr/website.jpg',
        price: '$50'
      }
    ]
  }
}
