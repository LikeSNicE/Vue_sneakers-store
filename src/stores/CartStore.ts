import { api } from '@/services/api'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type Sneakers } from '@/types/sneakers'
import { getErrorMessage } from '@/utils/errors'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Sneakers[]>([])

  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

  const vatPrice = computed(() => Math.round((totalPrice.value * 12) / 100))

  const addToCart = async (item: Sneakers) => {
    try {
      item.isAdded = true
      await api.patch(`/items/${item.id}`, {
        isAdded: true,
      })
      cart.value.push(item)
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
    }
  }

  const removeFromCart = async (item: Sneakers) => {
    try {
      item.isAdded = false
      await api.patch(`/items/${item.id}`, { isAdded: false })
      const index = cart.value.findIndex((cartItem) => cartItem.id === item.id)
      if (index !== -1) {
        cart.value.splice(index, 1)
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
    }
  }

  return {
    cart,
    totalPrice,
    vatPrice,
    addToCart,
    removeFromCart,
  }
})
