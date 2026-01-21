<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash'
import CardList from '../components/CardList.vue'
import { useLoadingStore } from '@/stores/loading-store'
import CardListSkeleton from '@/components/CardListSkeleton.vue'
import TitleBaseSlot from '@/components/TitleBaseSlot.vue'
import { useCartStore } from '@/stores/cart-store'
import { useFilterStore } from '@/stores/filters-store'
import { useGoodsStore } from '@/stores/goods-store'
import Pagination from '@/components/Pagination.vue'
import NotFoundItem from '@/components/NotFoundItem.vue'

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
  /* // Для корзина чтобы при перезагрузке не терялось состояние
  const localCart = localStorage.getItem('cart')
  // Если данные есть то присваиваем в cartStore.cart
  cartStore.cart = localCart ? JSON.parse(localCart) : [] */

  cartStore.loadCartFromLocalStorage()

  await goodsStore.fetchItems()
})

// Очищаем поисковый запрос при уходе со страницы
onUnmounted(() => {
  filterStore.filters.searchQuery = ''
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

watch(
  () => goodsStore.current_page,
  () => goodsStore.fetchItems(),
)
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
    <NotFoundItem v-if="goodsStore.goods.length === 0" />
    <CardListSkeleton v-if="loadingStore.isLoading" />

    <CardList
      :is-favorites="false"
      :items="goodsStore.goods"
      @add-to-favorite="goodsStore.addToFavorite"
    />

    <Pagination
      :total-pages="goodsStore.meta?.total_pages"
      :current-page="goodsStore.meta?.current_page"
    />
  </div>
</template>
