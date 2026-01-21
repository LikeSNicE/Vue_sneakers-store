import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SneakersCart } from '@/types/Sneakers'
import { useGoodsStore } from './goods-store'
import { api } from '@/services/api'

export const useCartStore = defineStore('cart', () => {
  const goodsStore = useGoodsStore()
  const cart = ref<SneakersCart[]>([])

  const totalPrice = computed(() => {
    console.log('Calculating totalPrice...')
    console.log('Current cart:', cart.value)
    const result = cart.value.reduce((acc, item) => {
      const price = Number(item.price)
      const quantity = Number(item.quantity)

      console.log(`Item ID: ${item.id}, Price: ${price}, Quantity: ${quantity}, Acc: ${acc}`)

      if (isNaN(price) || isNaN(quantity)) {
        console.error(`NaN detected for item ${item.id}: price=${price}, quantity=${quantity}`)
        return acc
      }

      return acc + price * quantity
    }, 0)

    console.log('Final totalPrice:', result)
    return result
  })

  const vatPrice = computed(() => {
    console.log('Calculating vatPrice...')
    const total = Number(totalPrice.value)
    if (isNaN(total)) {
      console.error('totalPrice is NaN, cannot calculate vatPrice.')
      return 0 // или другое значение по умолчанию
    }
    return Math.round((total * 16) / 100)
  })

  const addToCart = async (product: SneakersCart) => {
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

  const removeFromCart = async (product: SneakersCart) => {
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

  // локально обновляем UI сразу
  const clearCart = async () => {
    cart.value.forEach((cartItem: SneakersCart) => {
      const sneaker = goodsStore.goods.find((g) => g.id === cartItem.id)

      if (sneaker) sneaker.isAdded = false
    })

    // на сервер отправляем PATCH для каждого товара
    const promises = cart.value.map(
      async (item: SneakersCart) =>
        await api.patch(`/items/${item.id}`, {
          isAdded: false,
        }),
    )

    await Promise.all(promises)
    cart.value = []
  }

  const loadCartFromLocalStorage = () => {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      const parsedCart = JSON.parse(localCart)

      cart.value = parsedCart.map((item: SneakersCart) => ({
        ...item,
        price: Number(item.price), // Убедиться, что price - число
        quantity: Number(item.quantity), // Убедиться, что quantity - число
      }))
    } else {
      cart.value = []
    }
  }

  // Вызываем при инициализации стора
  loadCartFromLocalStorage()

  return {
    cart,
    totalPrice,
    vatPrice,

    addToCart,
    removeFromCart,
    clearCart,
    incQuantity,
    decQuantity,
    loadCartFromLocalStorage,
  }
})
