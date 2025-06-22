import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import type { Project } from '@/types'

// Base project data without translations
const baseProjects: Omit<Project, 'title' | 'description' | 'longDescription'>[] = [
  {
    id: 'virtual-tour',
    image: '@/assets/images/virtualtour.webp',
    technologies: ['Vue.js', 'Three.js', 'WebGL', 'Node.js'],
    category: 'Web Development',
    buttons: [
      {
        title: 'Visit',
        link: 'https://www.lycee-chabanne16.fr/visites/BACSN/index.htm'
      }
    ],
    date: '2022'
  },
  {
    id: 'xinko',
    image: '@/assets/images/xinko.webp',
    technologies: ['Node.js', 'Discord.js', 'MongoDB', 'Express'],
    category: 'Bot Development',
    featured: true,
    buttons: [
      {
        title: 'Invite',
        link: 'https://discord.com/api/oauth2/authorize?client_id=1035571329866407976&permissions=292288982151&scope=applications.commands%20bot'
      }
    ],
    date: '2023'
  },
  {
    id: 'image-manipulation',
    image: '@/assets/images/dig.webp',
    technologies: ['JavaScript', 'Node.js', 'Canvas', 'npm'],
    category: 'Open Source',
    featured: true,
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/discord-image-generation'
      },
      {
        title: 'NPM Package',
        link: 'https://www.npmjs.com/package/discord-image-generation'
      }
    ],
    date: '2022'
  },
  {
    id: 'primate-web-admin',
    image: '@/assets/images/primate.webp',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express'],
    category: 'Enterprise Software',
    date: '2023'
  },
  {
    id: 'instagram-bot',
    image: '@/assets/images/instagram.webp',
    technologies: ['JavaScript', 'Node.js', 'Instagram API', 'Canvas'],
    category: 'Social Media Bot',
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/instagram-bot'
      }
    ],
    date: '2022'
  },
  {
    id: 'crowdin-status-bot',
    image: '@/assets/images/crowdin.webp',
    technologies: ['Node.js', 'Discord.js', 'Crowdin API', 'Cron'],
    category: 'Automation',
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/discord-crowdin-status'
      }
    ],
    date: '2023'
  },
  {
    id: 'flowboard',
    image: '@/assets/images/flowboard/flowboard_1.webp',
    technologies: ['Vue.js', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
    category: 'Web Development',
    featured: true,
    features: [
      'Organize your tasks, projects and ideas by creating thematic boards adapted to your needs',
      'Add cards for each task, assign members, set due dates, and track progress at a glance',
      'Invite colleagues and teammates to join your boards to work together, share ideas, and coordinate your efforts',
      'Keep an overview of the progress of your projects thanks to a simple and intuitive interface',
      'Use labels, lists and tables to prioritize tasks, set priorities and keep the overview clear'
    ],
    gallery: [
      '@/assets/images/flowboard/flowboard_1.webp',
      '@/assets/images/flowboard/flowboard_2.webp',
      '@/assets/images/flowboard/flowboard_3.webp',
      '@/assets/images/flowboard/flowboard_4.webp'
    ],
    date: '2024'
  }
]

export function useProjects() {
  const { t } = useI18n()

  const projects = computed((): Project[] => {
    return baseProjects.map(project => ({
      ...project,
      title: t(`projectData.${project.id}.title`),
      description: t(`projectData.${project.id}.description`),
      longDescription: t(`projectData.${project.id}.longDescription`),
      buttons: project.buttons?.map(button => ({
        ...button,
        title: t(`projectData.${project.id}.buttons.${button.title.toLowerCase()}`, button.title)
      })) || []
    }))
  })

  return {
    projects: projects
  }
}
