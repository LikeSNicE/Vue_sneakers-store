<script setup lang="ts">
import Card from './Card.vue'
import { type CardList } from '@/types/Sneakers'
import { SneakersCart } from '@/types/Sneakers'

defineProps<CardList<SneakersCart>>()

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
      :item="item"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickFavorite="isFavorites ? undefined : () => emit('addToFavorite', item)"
    />
  </div>
</template>
