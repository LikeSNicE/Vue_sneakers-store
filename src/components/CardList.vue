<script setup lang="ts">
import Card from './Card.vue'
import { type Sneakers } from '@/types/sneakers'

defineProps<{
  items: Sneakers[]
  isFavorites: boolean
}>()

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div
    class="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]"
    v-auto-animate
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickFavorite="isFavorites ? undefined : () => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
