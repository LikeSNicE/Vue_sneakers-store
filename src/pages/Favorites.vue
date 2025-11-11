<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'

import CardList from '../components/CardList.vue'
import { base_url } from '@/services/api'
import { useLoadingStore } from '@/stores/loadingStore'
import CardListSkeleton from '@/components/CardListSkeleton.vue'
import NoFavoritesCard from '@/components/NoFavoritesCard.vue'
import ButtonNavigation from '@/components/ButtonNavigation.vue'
import { useGoBack } from '@/utils/useGoBack.vue'
import TitleBaseSlot from '@/components/TitleBaseSlot.vue'
import { useCartStore } from '@/stores/CartStore'
import { useGoodsStore } from '@/stores/Goods'

const loadingStore = useLoadingStore()
const goodsStore = useGoodsStore()
const { goBack } = useGoBack()

const cartStore = useCartStore()

const favorites = ref([])

onMounted(async () => {
  try {
    loadingStore.startLoading()
    const { data } = await axios.get(`${base_url}/favorites?_relations=items`)
    favorites.value = data.map((obj) => obj.item)
    console.log(data) // id: 1, item: карточка товара
    console.log(data.map((obj) => obj.item))
  } catch (error) {
    console.log(error.message)
  } finally {
    loadingStore.stopLoading()
  }
})

watch(
  () => cartStore.cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)
</script>

<template>
  <div class="flex gap-x-5 items-center mb-4">
    <ButtonNavigation @click="goBack"></ButtonNavigation>
    <TitleBaseSlot>Избранное</TitleBaseSlot>
  </div>

  <CardListSkeleton v-if="loadingStore.isLoading" />

  <NoFavoritesCard v-else-if="favorites.length === 0" />

  <CardList v-else :items="favorites" @add-to-cart="goodsStore.onClickAddPlus" isFavorites />
</template>
