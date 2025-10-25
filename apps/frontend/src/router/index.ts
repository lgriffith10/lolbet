import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/teams/auth/login/LoginView.vue'),
      meta: {
        isPublic: true,
        layout: 'PublicLayout',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/teams/auth/register/RegisterView.vue'),
      meta: {
        isPublic: true,
        layout: 'PublicLayout',
      },
    },
  ],
})

export default router
