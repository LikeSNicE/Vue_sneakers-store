<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { useRoute } from 'vue-router'
</script>
<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="font-bold text-4xl max-[420px]:text-2xl">Страница не найдена</h1>

    <div class="w-[250px] h-[250px] mt-5">
      <img class="w-full h-full object-cover" src="/pageNotFound.png" />
    </div>

    <p class="font-semibold mt-2 text-xl text-center max-[420px]:text-base">
      Упс… Мы не можем <br />найти то, что Вы ищете.
    </p>
    <BaseButton class="py-2 px-5 mt-2"
      ><RouterLink to="/">Вернуться на главную</RouterLink>
    </BaseButton>
  </div>
</template>
