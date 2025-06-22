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

export interface SiteConfig {
  name: string
  title: string
  description: string
  author: string
  url: string
  contact: ContactInfo
  social: SocialLink[]
}

export const siteConfig: SiteConfig = {
  name: 'Killian',
  title: 'Killian - Full Stack Developer', // This will be overridden by translations
  description: 'Full Stack Developer passionate about creating modern and performant web experiences.', // This will be overridden by translations
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
      username: 'killiandalcin'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/killian-dalcin',
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
  ]
}
