import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoadingStore } from './loadingStore'
import { useCartStore } from './CartStore'
import { useFilterStore } from './FiltersStore'
import { api } from '@/services/api'

export const useGoodsStore = defineStore('goods', () => {
  const goods = ref([])

  const loadingStore = useLoadingStore()
  const cartStore = useCartStore()
  const filterStore = useFilterStore()

  const onClickAddPlus = (item) => {
    if (!item.isAdded) {
      cartStore.addToCart(item)
    } else {
      cartStore.removeFromCart(item)
    }
  }

  const addToFavorite = async (item) => {
    try {
      if (!item.isFavorite) {
        const obj = {
          item_id: item.id,
        }

        item.isFavorite = true

        const { data } = await api.post(`/favorites`, obj)

        item.favoriteId = data.id

        await api.patch(`/items/${item.id}`, {
          isFavorite: true,
          favoriteId: data.id,
        })
      } else {
        // 1️⃣ Оптимистично обновляем UI
        item.isFavorite = false

        await api.delete(`/favorites/${item.favoriteId}`)

        await api.patch(`/items/${item.id}`, {
          isFavorite: false,
          favoriteId: null,
        })

        // 4️⃣ Локально очищаем favoriteId
        item.favoriteId = null
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchFavorites = async () => {
    try {
      const { data: goodsFromApi } = await api.get('/items')

      goods.value = goodsFromApi
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchItems = async () => {
    try {
      loadingStore.startLoading()

      const params = {
        sortBy: filterStore.filters.sortBy,
      }

      if (filterStore.filters.searchQuery) {
        params.title = `*${filterStore.filters.searchQuery}*`
      }

      const { data } = await api.get(`/items`, { params })

      console.log(data)

      goods.value = data
    } catch (error) {
      console.error(error.message)
    } finally {
      loadingStore.stopLoading()
    }
  }

  return {
    goods,
    fetchItems,
    fetchFavorites,
    addToFavorite,
    onClickAddPlus,
  }
})
