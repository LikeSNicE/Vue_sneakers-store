import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type CartItem } from '@/types/Cart'
import { useGoodsStore } from './goodsStore'
import { api } from '@/services/api'

export const useCartStore = defineStore('cart', () => {
  const goodsStore = useGoodsStore()
  const cart = ref<CartItem[]>([])

  const totalPrice = computed(() =>
    cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )

  const vatPrice = computed(() => Math.round((totalPrice.value * 16) / 100))

  const addToCart = async (product: CartItem) => {
    const cartItem = cart.value.find((i) => i.id === product.id)
    const sneaker = goodsStore.goods.find((g) => g.id === product.id)

    if (cartItem) {
      cartItem.quantity++
    } else {
      await api.patch(`/items/${sneaker?.id}`, { isAdded: true })
      sneaker!.isAdded = true
      cart.value.push({
        ...product,
        isAdded: true,
        quantity: 1,
      })
    }
  }

  const removeFromCart = async (product: CartItem) => {
    const sneaker = goodsStore.goods.find((g) => g.id === product.id)

    await api.patch(`/items/${sneaker?.id}`, { isAdded: false })
    sneaker!.isAdded = false
    const index = cart.value.findIndex((cartItem) => cartItem.id === product.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  const incQuantity = (id: number) => {
    const item = cart.value.find((i) => i.id === id)
    if (item) item.quantity++
  }

  const decQuantity = (id: number) => {
    const item = cart.value.find((i) => i.id === id)

    if (item) {
      if (item.quantity >= 1) item.quantity--
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  return {
    cart,
    totalPrice,
    vatPrice,

    addToCart,
    removeFromCart,
    clearCart,
    incQuantity,
    decQuantity,
  }
})
