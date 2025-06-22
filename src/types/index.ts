export interface Project {
  id: string
  title: string
  image: string
  description: string
  longDescription?: string
  technologies?: string[]
  category?: string
  featured?: boolean
  buttons?: ProjectButton[]
  date?: string
  demoUrl?: string
  githubUrl?: string
  features?: string[]
  gallery?: string[]
  status?: string
}

export interface ProjectButton {
  title: string
  link: string
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
