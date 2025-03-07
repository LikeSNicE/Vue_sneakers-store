<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/services/auth'

const router = useRouter()

// метод для выхода из профиля
const handleLogout = () => {
  logout(router)
}
</script>

<!-- Боковая панель -->
<template>
  <div class="profile-sidebar col-span-1 w-1/5">
    <ul class="h-full flex flex-col border-r border-r-gray-200 gap-y-2 pr-[24px]">
      <li>
        <router-link
          class="text-base tracking-wide block pl-[12px]  relative py-2"
          to="/profile"
          exact-active-class="
          before:content-['']
          before:absolute
          before:top-0
          before:left-0
          before:h-full 
          before:w-[4px] 
          before:bg-slate-900 
          transition
          duration-[850ms]
          ease-in-out
          font-semibold
          bg-slate-500
          opacity-70
          text-stone-50"
          exact
        >
          Главная
        </router-link>
      </li>
      <li>
        <router-link
          class="text-base tracking-wide block pl-[12px] py-2 relative"
          to="/profile/orders"
          active-class="
          before:content-['']
          before:absolute
          before:top-0
          before:left-0
          before:h-full 
          before:w-[4px] 
          before:bg-slate-900
          transition-all
          duration-[850ms]
          ease-in-out
          font-semibold
          bg-slate-500
          opacity-70
          text-stone-50"
        >
          Заказы
        </router-link>
      </li>

       <li>
        <router-link
          class="text-base tracking-wide block pl-[12px] py-2 relative"
          to="/profile/settings"
          active-class="
          before:content-['']
          before:absolute
          before:top-0
          before:left-0
          before:h-full 
          before:w-[4px] 
          before:bg-slate-900
          transition-all
          duration-[850ms]
          ease-in-out
          font-semibold
          bg-slate-500
          opacity-70
          text-stone-50"
        >
          Настройки профиля
        </router-link>
      </li>

      <li
        @click="handleLogout"
        class="focus:outline-none font-semibold text-gray-500 hover:text-primary-400 cursor-pointer text-red-400 hover:text-red-600"
      >
        <span class="text-base tracking-wide truncate capitalize hidden lg:block block pl-[12px] py-2"
          >Выйти</span
        >
      </li>
    </ul>
  </div>
</template>
