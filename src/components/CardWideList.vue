<script setup lang="ts">
import CardWide from './CardWide.vue'
import { type SneakersCardWide } from '@/types/Sneakers'

defineProps<{
  items: SneakersCardWide[]
}>()
</script>

<template>
  <div class="flex flex-col" v-auto-animate>
    <CardWide
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :quantity="item.quantity"
    >
    </CardWide>
  </div>
</template>
