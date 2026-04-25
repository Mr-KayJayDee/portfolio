// Live Hytale plugins shipped publicly — featured on /hytale#demos
// Each entry has corresponding i18n keys at hytale.demos.{id}.*
export interface HytaleDemo {
  id: string
  image: string
  github?: string
  curseforge?: string
  modtale?: string
  website?: string
  tech: string[]
  status: 'live' | 'pending' | 'soon'
  featured?: boolean
}

export const hytaleDemos: HytaleDemo[] = [
  {
    id: 'votepipe',
    image: '/images/projects/votepipe.svg',
    website: 'https://votepipe.com',
    modtale: 'https://modtale.net/mod/votepipe',
    curseforge: 'https://www.curseforge.com/hytale/mods/votepipe',
    tech: ['Java 25', 'SaaS', 'Webhooks', 'Votifier'],
    status: 'live',
    featured: true,
  },
  {
    id: 'gravity-flip',
    image: '/images/projects/gravityflip.png',
    modtale: 'https://modtale.net/mod/gravity-flip',
    curseforge: 'https://curseforge.com/hytale/mods/gravity-flip',
    tech: ['Java 25', 'Gradle Shadow', 'Hytale API'],
    status: 'live',
  },
]
