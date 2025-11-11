<script setup>
import { RouterLink } from 'vue-router'
import { authState } from '@/services/auth'
import { useDrawerStore } from '@/stores/DrawerStore'
import { ref } from 'vue'

defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
const drawerStore = useDrawerStore()

const isBurgerMenu = ref(true)
</script>

<template>
  <header
    class="flex justify-between items-center px-10 py-8 border-b border-slate-200 z-0 max-[1024px]:py-4 max-[1024px]:px-5"
  >
    <router-link to="/">
      <div class="flex gap-[16px]">
        <div class="">
          <img class="w-10" src="/logo.png" alt="Logo" />
        </div>
        <div class="title-logo-mobile max-[380px]:hidden">
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="md:hidden h-6 flex flex-col justify-between w-6 cursor-pointer" v-if="isBurgerMenu">
      <li class="h-1 w-full bg-black rounded"></li>
      <li class="h-1 w-full bg-black rounded"></li>
      <li class="h-1 w-full bg-black rounded"></li>
    </ul>

    <ul class="flex items-center gap-8 max-[768px]:hidden">
      <li
        @click="() => drawerStore.openDrawer()"
        class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} тенге</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="heart" />
          <span>Избранное</span>
        </li>
      </router-link>

      <li
        v-if="authState.isAuthenticated"
        class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black"
      >
        <router-link to="/profile/settings" class="flex gap-3 items-center">
          <img src="/profile.svg" alt="profile" />
          <span>Профиль</span>
        </router-link>
      </li>

      <li v-else>
        <router-link to="/auth/login" class="flex gap-3 items-center">
          <img src="/profile.svg" alt="profile" />
          <span>Войти</span>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>
