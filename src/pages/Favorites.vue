<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import CardList from '../components/CardList.vue'
const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://647af5741cbcb2a0.mokky.dev/favorites?_relations=items`,
    )
    favorites.value = data.map((obj) => obj.item)
    console.log(favorites.value)
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <h1 class="mb-4">Мои закладки</h1>
  <CardList :items="favorites" isFavorites />
</template>
