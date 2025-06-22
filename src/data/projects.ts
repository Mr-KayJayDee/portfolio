import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'virtual-tour',
    title: 'Virtual Tour',
    image: '@/assets/images/virtualtour.png',
    description: 'Développement d\'une plateforme de visite virtuelle interactive et immersive.',
    longDescription: 'Virtual Tour est une plateforme innovante permettant de créer des visites virtuelles interactives et immersives. Développée avec les dernières technologies web, elle offre une expérience utilisateur fluide et engageante pour explorer des espaces en 3D.',
    technologies: ['Vue.js', 'Three.js', 'WebGL', 'Node.js'],
    category: 'Web Development',
    featured: true,
    date: '2022'
  },
  {
    id: 'xinko',
    title: 'Xinko',
    image: '@/assets/images/xinko.png',
    description: 'Xinko is a multiplatform bot that can be used to create primary with ease and fun in it.',
    longDescription: 'Xinko est un bot multiplateforme innovant conçu pour simplifier la création de contenu primaire. Avec une interface intuitive et des fonctionnalités avancées, il permet aux utilisateurs de générer du contenu de qualité avec facilité et plaisir.',
    technologies: ['Node.js', 'Discord.js', 'MongoDB', 'Express'],
    category: 'Bot Development',
    featured: true,
    buttons: [
      {
        title: 'Website',
        link: 'https://xinko.bot'
      }
    ],
    date: '2023'
  },
  {
    id: 'image-manipulation',
    title: 'Image Manipulation',
    image: '@/assets/images/dig.png',
    description: 'Discord Image Generation: NPM package for code-based image manipulation. Originally an API, now open-source.',
    longDescription: 'Un package NPM complet pour la génération et la manipulation d\'images dans Discord. Ce projet open-source offre une API simple pour créer des memes, appliquer des filtres et générer des images dynamiques. Utilisé par de nombreux bots Discord avec plus de 100k téléchargements.',
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
    title: 'Primate Web Admin',
    image: '@/assets/images/primate.png',
    description: 'Primate Web Admin is a Web interface to manage Primate that is a Munki-like deployment tool for Windows.',
    longDescription: 'Interface web moderne pour gérer Primate, un outil de déploiement pour Windows inspiré de Munki. Cette application web permet aux administrateurs système de déployer et gérer des logiciels sur un parc informatique Windows de manière centralisée.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express'],
    category: 'Enterprise Software',
    date: '2023'
  },
  {
    id: 'instagram-bot',
    title: 'Instagram Bot',
    image: '@/assets/images/instagram.png',
    description: 'Fully functional Instagram bot using Insta.js by androz2091. It has many commands. Generate images with commands like: !stonk or !invert.',
    longDescription: 'Bot Instagram entièrement fonctionnel développé avec Insta.js. Il propose de nombreuses commandes pour générer des images personnalisées, des memes et des effets visuels. Parfait pour animer vos stories et posts Instagram avec du contenu original.',
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
    title: 'Crowdin Status Bot',
    image: '@/assets/images/crowdin.png',
    description: 'A bot that fetches Crowdin translation status and updates Discord messages with the latest status. Stay informed on progress!',
    longDescription: 'Bot Discord automatisé qui récupère le statut des traductions Crowdin et met à jour les messages Discord avec les dernières informations. Idéal pour les équipes de traduction qui souhaitent rester informées du progrès de leurs projets en temps réel.',
    technologies: ['Node.js', 'Discord.js', 'Crowdin API', 'Cron'],
    category: 'Automation',
    buttons: [
      {
        title: 'Repository',
        link: 'https://git.mrkayjaydee.xyz/Mr-KayJayDee/discord-crowdin-status'
      }
    ],
    date: '2023'
  }
]
