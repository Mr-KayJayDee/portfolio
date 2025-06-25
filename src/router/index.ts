import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsPage.vue')
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue')
    },
    {
      path: '/fiverr',
      name: 'fiverr',
      component: () => import('../views/FiverrPage.vue')
    },
    // TODO: page 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: HomePage,
      meta: {
        title: 'Page non trouvée - 404',
        description: 'La page que vous recherchez n\'existe pas. Retournez à l\'accueil pour découvrir mes services.'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (back/forward navigation), use it
    if (savedPosition) {
      return savedPosition
    }

    // If navigating to a hash anchor, scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    // For all other navigation, scroll to top
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// SEO Meta tags handler
router.beforeEach((to, from, next) => {
  // Update document title
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }

  // Update meta description
  if (to.meta?.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', to.meta.description as string)
  }

  next()
})

// Additional scroll to top handler for better compatibility
router.afterEach(() => {
  // Use nextTick to ensure the DOM is fully updated
  nextTick(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })
})

export default router
