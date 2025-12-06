<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <router-link to="/">
    <div class="flex gap-[16px]">
      <div class="">
        <img class="w-10" src="/logo.png" alt="Logo" />
      </div>
      <div class="title-logo-mobile max-[768px]:hidden">
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>
  </router-link>
</template>

<style></style>
