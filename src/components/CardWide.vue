<script setup lang="ts">
defineProps<{
  imageUrl: string
  title: string
  price: number
  quantity: number
  id: number
}>()

import { BASE_URL } from '@/config/baseUrl'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="w-full flex justify-between items-center p-4 border border-slate-100 min-w-0 gap-2 max-[768px]:flex-col"
  >
    <div class="flex items-center gap-4 min-w-0">
      <img class="w-[110px]" :src="`${BASE_URL}${imageUrl.replace(/^\//, '')}`" alt="sneaker" />
      <RouterLink
        :to="{
          name: 'fullCard',
          params: {
            sneakerId: id,
          },
        }"
        class="min-w-0 truncate hover:text-lime-600"
        >{{ title }}</RouterLink
      >
    </div>
    <div class="flex flex-col gap-1">
      <div
        class="flex gap-1 max-[768px]:flex-col max-[768px]:justify-center max-[768px]:items-center"
      >
        <span сlass="text-slate-400  max-[768px]:hidden ">Цена:</span>
        <p>
          <b>{{ quantity * price }}</b> тнг
        </p>
      </div>
      <p class="flex justify-end text-gray-700 text-sm">{{ quantity }} шт.x{{ price }} тнг</p>
    </div>
  </div>
</template>
