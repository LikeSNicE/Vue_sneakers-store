<script setup>
import CardWide from './CardWide.vue'

defineProps({
  items: Array,
})
</script>

<template>
  <div class="flex flex-col" v-auto-animate>
    <CardWide
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
    ></CardWide>
  </div>
</template>
