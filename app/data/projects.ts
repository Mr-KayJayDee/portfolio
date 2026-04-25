import type { Project } from '~~/shared/types'

// Base project data without translations
// Titles and descriptions are resolved via i18n keys: projects.${id}.title, projects.${id}.description
export const projects: Omit<Project, 'title' | 'description' | 'longDescription'>[] = [
  {
    id: 'votepipe',
    image: '/images/projects/votepipe.svg',
    technologies: ['Java 25', 'Hytale Plugin API', 'TypeScript', 'SaaS', 'HTTPS Webhooks', 'Votifier RSA/HMAC'],
    category: 'Hytale Plugin',
    date: '2026',
    featured: true,
    buttons: [
      {
        title: 'Website',
        link: 'https://votepipe.com',
      },
      {
        title: 'Modtale',
        link: 'https://modtale.net/mod/votepipe',
      },
      {
        title: 'CurseForge',
        link: 'https://www.curseforge.com/hytale/mods/votepipe',
      },
      {
        title: 'Documentation',
        link: 'https://votepipe.com/docs',
      },
    ],
  },
  {
    id: 'gravity-flip',
    image: '/images/projects/gravityflip.png',
    technologies: ['Java 25', 'Hytale Plugin API', 'Gradle Shadow', 'JUnit 5'],
    category: 'Hytale Plugin',
    date: '2026',
    featured: true,
    buttons: [
      {
        title: 'Modtale',
        link: 'https://modtale.net/mod/gravity-flip',
      },
      {
        title: 'CurseForge',
        link: 'https://curseforge.com/hytale/mods/gravity-flip',
      },
    ],
  },
  {
    id: 'playhours',
    image: '/images/projects/playhours.png',
    technologies: ['Java 17', 'Forge 1.20.1', 'LuckPerms', 'TOML Config'],
    category: 'Minecraft Mod',
    date: '2025',
    buttons: [
      {
        title: 'CurseForge',
        link: 'https://www.curseforge.com/minecraft/mc-mods/playhours',
      },
      {
        title: 'Repository',
        link: 'https://gitea.kamisama.ovh/kayjaydee/PlayHours',
      },
    ],
  },
  {
    id: 'virtual-tour',
    image: '/images/virtualtour.webp',
    technologies: ['Vue.js', 'Three.js', 'WebGL', 'Node.js'],
    category: 'Web Development',
    date: '2022',
    buttons: [
      {
        title: 'Visit',
        link: 'https://www.lycee-chabanne16.fr/visites/BACSN/index.htm',
      },
    ],
  },
  {
    id: 'xinko',
    image: '/images/xinko.webp',
    technologies: ['Node.js', 'Discord.js', 'MongoDB', 'Express'],
    category: 'Bot Development',
    date: '2023',
    buttons: [
      {
        title: 'Invite',
        link: 'https://discord.com/api/oauth2/authorize?client_id=1035571329866407976&permissions=292288982151&scope=applications.commands%20bot',
      },
    ],
  },
  {
    id: 'image-manipulation',
    image: '/images/dig.webp',
    technologies: ['JavaScript', 'Node.js', 'Canvas', 'npm'],
    category: 'Open Source',
    date: '2022',
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/discord-image-generation',
      },
      {
        title: 'NPM Package',
        link: 'https://www.npmjs.com/package/discord-image-generation',
      },
    ],
  },
  {
    id: 'primate-web-admin',
    image: '/images/primate.webp',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express'],
    category: 'Enterprise Software',
    date: '2023',
  },
  {
    id: 'instagram-bot',
    image: '/images/instagram.webp',
    technologies: ['JavaScript', 'Node.js', 'Instagram API', 'Canvas'],
    category: 'Social Media Bot',
    date: '2022',
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/instagram-bot',
      },
    ],
  },
  {
    id: 'crowdin-status-bot',
    image: '/images/crowdin.webp',
    technologies: ['Node.js', 'Discord.js', 'Crowdin API', 'Cron'],
    category: 'Automation',
    date: '2023',
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/discord-crowdin-status',
      },
    ],
  },
  {
    id: 'flowboard',
    image: '/images/flowboard/flowboard_1.webp',
    technologies: ['Vue.js', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
    category: 'Web Development',
    date: '2024',
    featured: true,
    features: [
      'Organize your tasks, projects and ideas by creating thematic boards adapted to your needs',
      'Add cards for each task, assign members, set due dates, and track progress at a glance',
      'Invite colleagues and teammates to join your boards to work together, share ideas, and coordinate your efforts',
      'Keep an overview of the progress of your projects thanks to a simple and intuitive interface',
      'Use labels, lists and tables to prioritize tasks, set priorities and keep the overview clear',
    ],
    gallery: [
      '/images/flowboard/flowboard_1.webp',
      '/images/flowboard/flowboard_2.webp',
      '/images/flowboard/flowboard_3.webp',
      '/images/flowboard/flowboard_4.webp',
    ],
  },
]
