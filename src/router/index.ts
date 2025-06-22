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
