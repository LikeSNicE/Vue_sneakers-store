import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import Favorites from '@/pages/Favorites.vue'
import AuthPage from '@/pages/AuthPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

import ProfileSettings from '@/components/ProfileSettings.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ProfileOrders from '@/components/ProfileOrders.vue'
import Test from '@/components/Test.vue'

const routes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: Favorites,
      },
      {
        path: 'profile',
        component: ProfileLayout,
        children: [
          {
            path: 'settings',
            name: 'ProfileSettings',
            component: ProfileSettings,
            meta: {
              title: 'Настройки профиля',
            },
          },
          {
            path: 'orders',
            name: 'orders',
            component: ProfileOrders,
            meta: {
              title: 'Заказы',
            },
          },
        ],
      },
      {
        path: 'test',
        name: 'test',
        component: Test,
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: AuthPage,
      },
      { path: 'register', name: 'register', component: RegisterPage },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
