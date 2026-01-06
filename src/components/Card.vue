<script setup lang="ts">
import { BASE_URL } from '@/config/baseUrl'
import { type CartItem } from '@/types/Cart'
import { useGoodsStore } from '@/stores/goodsStore'
import { RouterLink } from 'vue-router'

defineProps<{
  item: CartItem
  id: number
  imageUrl: string
  title: string
  price: number
  isFavorite: boolean
  isAdded: boolean

  onClickFavorite?: () => void
  onClickAdd?: () => void
}>()

const goodsStore = useGoodsStore()
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      v-if="onClickFavorite"
      :src="!isFavorite ? `${BASE_URL}like-1.svg` : `${BASE_URL}like-2.svg`"
      alt="favorite"
      class="absolute top-8 left-8 cursor-pointer"
      @click="onClickFavorite"
    />
    <RouterLink
      :to="{
        name: 'fullCard',
        params: {
          sneakerId: id,
        },
      }"
    >
      <img class="cursor-pointer" :src="`${BASE_URL}${imageUrl.replace(/^\//, '')}`" />
    </RouterLink>
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} тенге</b>
      </div>

      <img
        class="cursor-pointer"
        @click="goodsStore.onClickAddPlus(item)"
        :src="!isAdded ? `${BASE_URL}plus.svg` : `${BASE_URL}checked.svg`"
        alt="plus"
      />
    </div>
  </div>
</template>
