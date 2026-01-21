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
    class="w-full flex justify-between items-center p-4 border border-slate-100 min-w-0 gap-2 max-[768px]:flex-col max-[450px]:p-2"
  >
    <div class="flex items-center gap-4 min-w-0 max-[768px]:w-full">
      <img
        class="w-[110px] max-[450px]:w-[80px] max-[450px]:h-[80px] object-contain"
        :src="`${BASE_URL}${imageUrl.replace(/^\//, '')}`"
        alt="sneaker"
      />
      <RouterLink
        :to="{
          name: 'fullCard',
          params: {
            sneakerId: id,
          },
        }"
        class="min-w-0 truncate hover:text-lime-600 max-[768px]:flex-1"
        >{{ title }}</RouterLink
      >
    </div>
    <div
      class="flex flex-col gap-1 max-[768px]:flex-row max-[768px]:justify-between max-[768px]:w-full card-wide-price"
    >
      <div class="flex gap-1 max-[768px]:order-1">
        <span сlass="text-slate-400 max-[768px]:hidden  ">Цена:</span>
        <p class="">
          <b>{{ quantity * price }}</b> тенге
        </p>
      </div>
      <p class="flex justify-end text-gray-700 text-sm max-[768px]:hidden">
        {{ quantity }} шт.x{{ price }} тенге
      </p>
      <p class="min-[769px]:hidden">Количество: {{ quantity }} шт.</p>
    </div>
  </div>
</template>

<style scoped>
.card-wide-price {
  @media (max-width: 375px) {
    align-items: center;
    flex-direction: column;
  }
}
</style>
