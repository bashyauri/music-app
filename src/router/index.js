import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ManageView from '@/views/ManageView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'text-yellow-500',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') // Lazy-loaded
    },
    {
      path: '/manage-music',
      name: 'manage',
      alias: '/manage',
      component: ManageView,
      meta: { requiresAuth: true }
    },
    {
      name: 'song',
      path: '/song/:id',

      component: () => import('@/views/SongView.vue') // Lazy-loaded
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'home' } // Redirect unmatched routes to home
    }
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (!to.meta.requiresAuth) {
    next()
  } else if (userStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' }) // Redirect to home if not logged in
  }
})

export default router
