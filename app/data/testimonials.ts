import type { Testimonial, TestimonialsStats } from '~~/shared/types'

export const testimonials: Testimonial[] = [
  {
    name: 'unqlf_',
    role: 'Client',
    company: 'France',
    avatar: 'https://ui-avatars.com/api/?name=U&background=3b82f6&color=ffffff&size=128',
    rating: 5,
    content:
      "Je conseil ce vendeur il écoute clairement les conseils, les informations qu'on lui donne, il mérite clairement son niveau dans le développement et prend en compte chaque erreur.",
    date: '15/03/2023',
    platform: 'Fiverr',
    featured: true,
    project_type: 'Plugin Minecraft',
    results: ["Prix: Jusqu'à 50€", 'Durée: 10 jours', 'Écoute client excellente'],
  },
  {
    name: 'colo263',
    role: 'Client',
    company: 'France',
    avatar: 'https://ui-avatars.com/api/?name=C&background=059669&color=ffffff&size=128',
    rating: 5,
    content:
      "Travail excellent, Communication au top, Disponible en tout temps, réactif et à l'écoute je le recommande vivement et reviendrai vers lui si je dois refaire un projet similaire !",
    date: '22/04/2023',
    platform: 'Fiverr',
    featured: true,
    project_type: 'Bot Discord',
    results: ["Prix: Jusqu'à 50€", 'Durée: 4 jours', 'Communication parfaite'],
  },
  {
    name: 'aurlienbarbet',
    role: 'Client',
    company: 'France',
    avatar: 'https://ui-avatars.com/api/?name=A&background=dc2626&color=ffffff&size=128',
    rating: 5,
    content:
      "Le prestataire est très professionnel, prêt à faire l'offre la plus juste et à ajuster un prix pour votre commande. Réponds à tout les questions ! une bonne expérience pour ma part",
    date: '08/06/2023',
    platform: 'Fiverr',
    project_type: 'Bot Discord',
    results: ["Prix: Jusqu'à 50€", 'Durée: 1 jour', 'Prix ajusté sur mesure'],
  },
  {
    name: 'cobra2',
    role: 'Client',
    company: 'France',
    avatar: 'https://ui-avatars.com/api/?name=C&background=7c3aed&color=ffffff&size=128',
    rating: 5,
    content:
      'Excellent développeur, la commande fut plus rapide que prévu la communication est instantané et le résultat est parfait. Je recommande fortement et reviendrai sûrement pour des mise à jour !',
    date: '12/11/2022',
    platform: 'Fiverr',
    featured: true,
    project_type: 'Bot Discord',
    results: [
      'Livraison plus rapide que prévu',
      'Communication instantanée',
      'Résultat parfait',
    ],
  },
  {
    name: 'botuhuh',
    role: 'Client',
    company: 'France',
    avatar: 'https://ui-avatars.com/api/?name=B&background=ea580c&color=ffffff&size=128',
    rating: 5,
    content: 'awesome guy, I recommend, thanks again !!!!',
    date: '28/09/2022',
    platform: 'Fiverr',
    project_type: 'Bot Discord',
    results: ['Client international satisfait', 'Recommandation forte', 'Service apprécié'],
  },
]

export const testimonialsStats: TestimonialsStats = {
  totalReviews: 5,
  averageRating: 5.0,
  projectsCompleted: 25,
}
