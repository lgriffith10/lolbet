import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
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
  {
    path: '/',
    name: 'Home',
    component: () => import('@/teams/home/HomeView.vue'),
    children: [],
  },
]
