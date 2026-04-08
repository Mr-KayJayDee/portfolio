export interface ProjectButton {
  title: string
  link: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  category: string
  date: string
  featured?: boolean
  buttons?: ProjectButton[]
  gallery?: string[]
  demoUrl?: string
  githubUrl?: string
  features?: string[]
}

export interface Technology {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  image: string
}

export interface TechStack {
  programming: Technology[]
  front: Technology[]
  database: Technology[]
  devtools: Technology[]
  operating_systems: Technology[]
  socials: Technology[]
}

export interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  content: string
  date: string
  platform: string
  featured?: boolean
  project_type: string
  results?: string[]
}

export interface TestimonialsStats {
  totalReviews: number
  averageRating: number
  projectsCompleted: number
}

export interface FAQ {
  questionKey: string
  answerKey: string
  featuresKey: string
}

export interface ContactInfo {
  email: string
  location: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  username?: string
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
