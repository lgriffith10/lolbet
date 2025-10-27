import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/utils/router/routes.ts'
import { useAuthStore } from '@/entities/store/useAuthStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const isRoutePublic = to.meta.isPublic

  if (authStore.isAuthenticated && isRoutePublic) {
    console.log('test')
    return next({ name: 'Home' })
  }

  if (!authStore.isAuthenticated && !isRoutePublic) {
    return next({ name: 'Login' })
  }

  return next()
})

export default router
