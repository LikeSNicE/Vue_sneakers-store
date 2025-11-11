<script setup>
import { watch, onMounted } from 'vue'
import debounce from 'lodash.debounce'
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

// const items = ref([])

const onChangeSelect = (event) => {
  filterStore.filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filterStore.filters.searchQuery = event.target.value
}, 300)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')

  cartStore.cart = localCart ? JSON.parse(localCart) : []

  await goodsStore.fetchItems()
  await goodsStore.fetchFavorites()
  // goodsStore.syncCartState() // <-- добавляем синхронизацию
})

watch(
  () => cartStore.cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
    // goodsStore.syncCartState()
  },
  { deep: true },
)

watch(filterStore.filters, () => goodsStore.fetchItems(), {
  deep: true,
})
</script>

<!-- <template>
  <div class="flex justify-between items-center">
    <TitleBaseSlot>Все кроссовки</TitleBaseSlot>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (Дешевые)</option>
        <option value="-price">По цене (Дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute top-3 left-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardListSkeleton v-if="loadingStore.isLoading" />

    <CardList
      :items="goodsStore.goods"
      @add-to-favorite="goodsStore.addToFavorite"
      @add-to-cart="goodsStore.onClickAddPlus"
    />
  </div>
</template> -->
