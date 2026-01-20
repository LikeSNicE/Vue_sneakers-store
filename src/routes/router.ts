import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import Favorites from '@/pages/Favorites.vue'
import AuthPage from '@/pages/AuthPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

import ProfileSettings from '@/components/ProfileSettings.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ProfileOrders from '@/components/ProfileOrders.vue'
import FullCard from '@/components/FullCard.vue'
import Test from '@/components/Test.vue'
import { authState } from '@/services/auth'
import PageNotFound from '@/components/PageNotFound.vue'

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
        meta: { requiresAuth: true },
      },
      {
        path: 'profile',
        component: ProfileLayout,
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      },
      {
        path: 'sneakers/:sneakerId',
        name: 'fullCard',
        component: FullCard,
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
  {
    path: '/:pathMatch(.*)',
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !authState.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
