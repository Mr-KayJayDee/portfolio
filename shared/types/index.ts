export interface ProjectButton {
  title: string
  link: string
}

export interface Project {
  id: string
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
