<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { authState } from '../services/auth'
import { useDrawerStore } from '../stores/DrawerStore'
import Logo from './Logo.vue'

defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
const drawerStore = useDrawerStore()
</script>

<template>
  <header
    class="flex justify-between items-center px-10 py-8 border-b border-slate-200 z-0 header-content-display max-[1024px]:py-4 max-[1024px]:px-5 header-md header-sm"
  >
    <Logo />

    <ul class="flex items-center gap-8 max-[500px]:gap-2">
      <li
        @click="() => drawerStore.openDrawer()"
        class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black max-[500px]:flex-col max-[500px]:gap-1"
      >
        <img src="/cart.svg" alt="cart" />
        <b class="">{{ totalPrice }} тенге</b>
      </li>

      <router-link to="/favorites">
        <li
          class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black max-[500px]:flex-col max-[500px]:gap-1"
        >
          <img src="/heart.svg" alt="heart" />
          <span>Избранное</span>
        </li>
      </router-link>

      <router-link v-if="authState.isAuthenticated" to="/profile/settings" class="">
        <li
          class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black max-[500px]:flex-col max-[500px]:gap-1"
        >
          <img src="/profile.svg" alt="profile" />
          <span>Профиль</span>
        </li>
      </router-link>

      <router-link v-else to="/auth/login">
        <li class="flex gap-3 items-center">
          <img src="/profile.svg" alt="profile" />
          <span>Войти</span>
        </li>
      </router-link>
    </ul>
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
      gap: 20px;
    }
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
</style>
