<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import CardList from '../components/CardList.vue'
import { api } from '@/services/api'
import { useLoadingStore } from '@/stores/loadingStore'
import CardListSkeleton from '@/components/CardListSkeleton.vue'
import NoFavoritesCard from '@/components/NoFavoritesCard.vue'
import ButtonNavigation from '@/components/ButtonNavigation.vue'
import { useGoBack } from '@/utils/useGoBack'
import TitleBaseSlot from '@/components/TitleBaseSlot.vue'
import { useCartStore } from '@/stores/cartStore'
import { useGoodsStore } from '@/stores/goodsStore'
import { getErrorMessage } from '@/utils/errors'
import { type FavoritesSneakers } from '@/types/Favorites'
import { type Sneakers } from '@/types/Sneakers'

const loadingStore = useLoadingStore()
const goodsStore = useGoodsStore()
const { goBack } = useGoBack()

const cartStore = useCartStore()

const favorites = ref<Sneakers[]>([])

onMounted(async () => {
  try {
    loadingStore.startLoading()
    const { data } = await api.get(`/favorites?_relations=items`)
    favorites.value = data.map((obj: FavoritesSneakers) => obj.item)
    console.log('data from favorites: ', data) // id: 1, item: карточка товара
    console.log('favorites: ', favorites.value)
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
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
