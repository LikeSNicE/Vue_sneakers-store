import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoadingStore } from './loadingStore'
import { useCartStore } from './CartStore'
import { useFilterStore } from './FiltersStore'
import { api } from '@/services/api'
import { type Sneakers, type IItemsParams } from '@/types/sneakers'
import { getErrorMessage } from '@/utils/errors'

export const useGoodsStore = defineStore('goods', () => {
  const goods = ref<Sneakers[]>([])

  const loadingStore = useLoadingStore()
  const cartStore = useCartStore()
  const filterStore = useFilterStore()

  const onClickAddPlus = (item: Sneakers) => {
    if (!item.isAdded) {
      cartStore.addToCart(item)
    } else {
      cartStore.removeFromCart(item)
    }
  }

  const addToFavorite = async (item: Sneakers) => {
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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
    }
  }

  const fetchFavorites = async () => {
    try {
      await api.get('/items')
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.error(errorMessage)
    }
  }

  const fetchItems = async () => {
    try {
      loadingStore.startLoading()

      const params: IItemsParams = {
        sortBy: filterStore.filters.sortBy,
      }

      if (filterStore.filters.searchQuery) {
        params.title = `*${filterStore.filters.searchQuery}*`
      }

      const { data } = await api.get(`/items`, { params })

      console.log(data)

      goods.value = data
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.error(errorMessage)
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
