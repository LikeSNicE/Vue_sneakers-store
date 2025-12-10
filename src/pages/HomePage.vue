<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { debounce } from 'lodash'
import CardList from '../components/CardList.vue'
import { useLoadingStore } from '@/stores/loadingStore'
import CardListSkeleton from '@/components/CardListSkeleton.vue'
import TitleBaseSlot from '@/components/TitleBaseSlot.vue'
import { useCartStore } from '@/stores/CartStore'
import { useFilterStore } from '@/stores/FiltersStore'
import { useGoodsStore } from '@/stores/Goods'

const cartStore = useCartStore()

const loadingStore = useLoadingStore()
const filterStore = useFilterStore()
const goodsStore = useGoodsStore()

const onChangeSelect = (event: Event) => {
  filterStore.filters.sortBy = (event.target as HTMLInputElement).value
}

const onChangeSearchInput = debounce((event: Event) => {
  filterStore.filters.searchQuery = (event.target as HTMLInputElement).value
}, 300)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')

  cartStore.cart = localCart ? JSON.parse(localCart) : []

  await goodsStore.fetchItems()
  await goodsStore.fetchFavorites()
})

watch(
  () => cartStore.cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)

watch(filterStore.filters, () => goodsStore.fetchItems(), {
  deep: true,
})
</script>

<template>
  <div class="flex justify-between items-center max-[768px]:flex-col">
    <TitleBaseSlot>Все кроссовки</TitleBaseSlot>

    <div class="flex gap-4 max-[768px]:mt-4 max-[480px]:flex-col max-[480px]:w-full">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (Дешевые)</option>
        <option value="-price">По цене (Дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute top-3 left-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 max-[480px]:w-full"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardListSkeleton v-if="loadingStore.isLoading" />

    <CardList
      :is-favorites="false"
      :items="goodsStore.goods"
      @add-to-favorite="goodsStore.addToFavorite"
      @add-to-cart="goodsStore.onClickAddPlus"
    />
  </div>
</template>
