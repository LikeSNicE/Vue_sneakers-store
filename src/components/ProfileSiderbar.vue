<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<!-- Боковая панель -->
<template>
  <div
    class="profile-sidebar bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] p-5 rounded-3xl min-w-[280px] max-[1050px]:w-full"
  >
    <ul class="flex flex-col gap-1">
      <li>
        <router-link
          class="text-base tracking-wide block px-3 py-2 rounded-lg"
          to="/profile/orders"
          exact-active-class="
          transition
          duration-[850ms]
          ease-in-out
          font-semibold
          bg-lime-500
          text-white"
        >
          Заказы
        </router-link>
      </li>

      <li>
        <router-link
          class="text-base tracking-wide block px-3 py-2 rounded-lg"
          to="/profile/settings"
          active-class="
          transition
          duration-[850ms]
          ease-in-out
          font-semibold
          bg-lime-500
          text-white"
        >
          Настройки профиля
        </router-link>
      </li>
    </ul>
  </div>
</template>
