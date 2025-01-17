<script setup>
import { RouterLink } from 'vue-router'
import { isAuthenticated } from '@/services/auth'

defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between items-center px-10 py-8 border-b border-slate-200 z-0">
    <router-link to="/">
      <div class="flex gap-[16px]">
        <div>
          <img class="w-10" src="/logo.png" alt="Logo" />
        </div>
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-8">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="heart" />
          <span>Закладки</span>
        </li>
      </router-link>

      <li
        v-if="isAuthenticated()"
        class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black"
      >
        <router-link to="/profile" class="flex gap-3 items-center">
          <img src="/profile.svg" alt="profile" />
          <span>Профиль</span>
        </router-link>
      </li>

      <li v-else>
        <router-link to="/auth" class="flex gap-3 items-center">
          <img src="/profile.svg" alt="profile" />
          <span>Войти</span>
        </router-link>
      </li>
    </ul>
  </header>
</template>
