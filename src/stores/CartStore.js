import { api } from '@/services/api'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

  const vatPrice = computed(() => Math.round((totalPrice.value * 12) / 100))

  const addToCart = async (item) => {
    try {
      item.isAdded = true
      await api.patch(`/items/${item.id}`, {
        isAdded: true,
      })
      cart.value.push(item)
    } catch (error) {
      console.log(error.message)
    }
  }

  const removeFromCart = async (item) => {
    try {
      item.isAdded = false
      await api.patch(`/items/${item.id}`, { isAdded: false })
      const index = cart.value.findIndex((cartItem) => cartItem.id === item.id)
      if (index !== -1) {
        cart.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Ошибка при удалении из корзины:', error)
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
