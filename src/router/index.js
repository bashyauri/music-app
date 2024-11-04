import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ManageView from '@/views/ManageView.vue'
import { useUserStore } from '@/stores/user'
import AboutView from '@/views/AboutView.vue'

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
      component: AboutView
    },
    {
      path: '/manage',
      name: 'manage',

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

router.beforeEach((to, from, next) => {
  console.log(`Navigating from: ${from.name} to: ${to.name}`)
  const userStore = useUserStore()

  if (!to.meta.requiresAuth) {
    next()
  } else if (userStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
