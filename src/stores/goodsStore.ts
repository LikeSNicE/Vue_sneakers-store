import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoadingStore } from './loadingStore'
import { useCartStore } from './CartStore'
import { useFilterStore } from './filtersStore'
import { api } from '@/services/api'
import { type Sneakers, type ItemsParams } from '@/types/Sneakers'
import { getErrorMessage } from '@/utils/errors'
import { SneakersCart } from '@/types/Sneakers'
import { type MetaPagination, Pagination } from '@/types/Pagination'

export const useGoodsStore = defineStore('goods', () => {
  const loadingStore = useLoadingStore()
  const cartStore = useCartStore()
  const filterStore = useFilterStore()

  const goods = ref<SneakersCart[]>([])
  const currentSneaker = ref<SneakersCart | null>(null)

  // пагинация
  const meta = ref<MetaPagination | null>(null)
  const current_page = ref(1) // текущая страница
  const limit = ref(8) // количество items на странице

  const onClickAddPlus = (item: SneakersCart) => {
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
        item.isFavorite = false

        await api.delete(`/favorites/${item.favoriteId}`)

        await api.patch(`/items/${item.id}`, {
          isFavorite: false,
          favoriteId: null,
        })

        item.favoriteId = null
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
    }
  }

  // const fetchFavorites = async () => {
  //   try {
  //     await api.get('/items')
  //   } catch (error: unknown) {
  //     const errorMessage = getErrorMessage(error)
  //     console.error(errorMessage)
  //   }
  // }

  const fetchItems = async () => {
    try {
      loadingStore.startLoading()

      const params: ItemsParams = {
        sortBy: filterStore.filters.sortBy,
        page: current_page.value,
        limit: limit.value,
      }

      if (filterStore.filters.searchQuery) {
        params.title = `*${filterStore.filters.searchQuery}*`
        setCurrentPage(1) // Выводим первую текущую страницу при поиске товара
      }

      const { data }: { data: Pagination<SneakersCart> } = await api.get(`/items`, { params })

      goods.value = data.items
      meta.value = data.meta
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.error(errorMessage)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const fetchSneaker = async (id: number): Promise<void> => {
    if (!id || isNaN(id)) {
      console.error('Некоррктенный ID', id)
      currentSneaker.value = null
      return
    }

    try {
      const { data } = await api.get(`/items/${id}`)

      if (!data || typeof data !== 'object') {
        console.warn('Кроссовок не найден')
        currentSneaker.value = null
        return
      }

      currentSneaker.value = data
      console.log(currentSneaker.value)
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
    }
  }

  const setCurrentPage = (page: number) => {
    current_page.value = page
  }

  return {
    goods,
    currentSneaker,
    meta,
    current_page,
    fetchItems,
    addToFavorite,
    onClickAddPlus,
    fetchSneaker,
    setCurrentPage,
  }
})
