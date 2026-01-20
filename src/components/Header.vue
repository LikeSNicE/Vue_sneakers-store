<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { authState } from '../services/auth'
import { useDrawerStore } from '../stores/drawerStore'
import Logo from './Logo.vue'
import { logout } from '../services/auth'
import { useRouter } from 'vue-router'
import { type NavItem, type HeaderProps } from '@/types/Header'
import { useUiStore } from '@/stores/UiStore'
import { useClickOutside } from '@/composables/useClickOutside'
import { ref } from 'vue'

defineProps<HeaderProps>()

const drawerStore = useDrawerStore()
const uiStore = useUiStore()

const router = useRouter()

const handleLogout = async () => {
  await router.push('/auth/login')
  logout()
}

const handleItemClick = () => {
  uiStore.closeAllMenus()
}

const menuItems: NavItem[] = [
  { id: 1, name: 'Заказы', path: '/profile/orders' },
  { id: 2, name: 'Мои отзывы', path: '/test' },
  { id: 3, name: 'Настройки профиля', path: '/profile/settings' },
]

const menuProfileRef = ref<HTMLElement | null>(null)

useClickOutside(menuProfileRef, () => uiStore.closeAllMenus())
</script>

<template>
  <header class="border-b border-slate-200 z-0">
    <div class="container">
      <div
        class="flex justify-between items-center px-10 py-8 header-content-display max-[1024px]:py-4 max-[1024px]:px-5 header-md header-sm"
      >
        <div class="flex gap-4">
          <Logo @click="uiStore.closeAllMenus" />

          <div class="title-logo-mobile max-[768px]:hidden">
            <h2 class="text-xl font-bold uppercase" @click="uiStore.closeAllMenus">
              <RouterLink to="/">Vue Sneakers</RouterLink>
            </h2>
            <p class="text-slate-400">Магазин идеальных кроссовок</p>
          </div>
        </div>

        <ul class="flex items-center gap-9 max-[500px]:gap-4">
          <li
            v-if="authState.isAuthenticated"
            @click="
              () => {
                drawerStore.openDrawer()
                handleItemClick()
              }
            "
            class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black max-[500px]:flex-col max-[500px]:gap-1"
          >
            <img src="/cart.svg" alt="cart" />
            <b class="">{{ totalPrice }} тенге</b>
          </li>

          <li @click="uiStore.closeAllMenus">
            <router-link
              class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black max-[500px]:flex-col max-[500px]:gap-1"
              to="/favorites"
            >
              <img src="/heart.svg" alt="heart" />
              <span>Избранное</span>
            </router-link>
          </li>

          <li
            v-if="authState.isAuthenticated"
            class="relative max-[768px]:hidden"
            ref="menuProfileRef"
          >
            <div class="cursor-pointer w-7 h-7" @click="uiStore.toggleProfileMenu">
              <img
                class="w-full h-full object-cover rounded-full"
                src="/profile.svg"
                alt="profile"
              />
            </div>

            <transition name="fade">
              <div
                v-if="uiStore.isElementOpen"
                class="w-[270px] z-50 bg-[#f2f2f2] rounded-2xl flex flex-col p-5 shadow-lg absolute top-8 right-0"
                @mouseenter=""
              >
                <div class="flex items-center gap-2">
                  <RouterLink
                    to="/profile/settings"
                    class="rounded-full w-7 h-7 flex justify-center items-center z-50 text-white"
                  >
                    <img
                      @click="uiStore.closeAllMenus"
                      class="w-full h-full object-cover rounded-full"
                      src="/profile.svg"
                      alt="profile"
                    />
                  </RouterLink>
                  <p class="font-bold">Никита Луценко</p>
                </div>

                <ul class="py-2 text-sm mt-5 flex flex-col gap-2">
                  <li v-for="item in menuItems" :key="item.id">
                    <RouterLink
                      @click="uiStore.closeAllMenus"
                      :to="item.path"
                      class="hover:text-lime-600"
                    >
                      {{ item.name }}
                    </RouterLink>
                  </li>
                  <button class="text-left hover:text-lime-600" @click="handleLogout">Выйти</button>
                </ul>
              </div>
            </transition>
          </li>

          <li
            v-if="authState.isAuthenticated"
            class="cursor-pointer flex justify-center items-center min-[769px]:hidden"
          >
            <RouterLink to="/profile/settings" class="inline-flex w-7 h-7">
              <img
                class="w-full h-full object-cover rounded-full"
                src="/profile.svg"
                alt="profile"
              />
            </RouterLink>
          </li>

          <li v-else>
            <router-link class="flex gap-3 items-center" to="/auth/login">
              <img src="/profile.svg" alt="profile" />
              <span>Войти</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-md {
  & {
    @media (max-width: 768px) {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      z-index: 2;
      padding: 16px;
      justify-content: center;
      gap: 36px;
    }
  }

  @media (max-width: 500px) {
    gap: 16px;
  }
}

.header-sm {
  @media (max-width: 380px) {
    justify-content: space-between;
    flex-direction: column;
  }

  @media (max-width: 320px) {
    padding: 10px;
  }

  & ul {
    @media (max-width: 380px) {
      order: -1;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: top right;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: fade(0.7);
}
</style>
