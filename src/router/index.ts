import { createRouter, createWebHistory } from 'vue-router'
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
  scrollBehavior() {
    // Always scroll to top for consistent navigation
    return { top: 0 }
  }
})

// Force scroll to top on every navigation
router.afterEach(() => {
  // Use nextTick to ensure DOM is updated
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
})

export default router
