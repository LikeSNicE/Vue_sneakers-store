<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { api, base_url } from '@/services/api'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './infoBlock.vue'
import { getUserIdFromToken } from '@/services/api'
import BaseButton from './BaseButton.vue'
import { useLoadingStore } from '@/stores/loadingStore'
import { useCartStore } from '@/stores/CartStore'
import { useGoodsStore } from '@/stores/Goods'

const emit = defineEmits(['createOrder'])

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const loadingStore = useLoadingStore()
const cartStore = useCartStore()
const goodsStore = useGoodsStore()

const isCreating = ref(false)
const orderId = ref(null)
const totalOrderPrice = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    loadingStore.startLoading()
    const token = localStorage.getItem('token')
    const userId = getUserIdFromToken(token)

    if (!userId) {
      throw new Error('Пользователь не найден')
    }

    const { data } = await axios.post(`${base_url}/orders`, {
      items: cartStore.cart,
      totalPrice: props.totalPrice,
      userId,
    })

    console.log(data)

    // локально обновляем UI сразу
    cartStore.cart.forEach((cartItem) => {
      const item = goodsStore.goods.find((g) => g.id === cartItem.id)

      if (item) item.isAdded = false
    })

    // на сервер отправляем PATCH для каждого товара
    const promises = cartStore.cart.map(
      async (item) => await api.patch(`/items/${item.id}`, { isAdded: false }),
    )
    await Promise.all(promises) // выполняем все параллельно

    cartStore.cart = []

    // return data
    orderId.value = data.id
    totalOrderPrice.value = data.totalPrice
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
    loadingStore.stopLoading()
  }
}

const cartIsEmpty = computed(() => cartStore.cart.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div
    class="bg-white w-96 h-full top-0 right-0 fixed z-20 p-8"
    :class="{
      'overflow-y-auto': !cartIsEmpty,
    }"
  >
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ. "
        image-url="/package-icon.png"
      />

      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else>
      <CartItemList />
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого: </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} Тенге</b>
        </div>

        <div class="flex gap-2">
          <span>НДС: 12%</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} Тенге</b>
        </div>

        <BaseButton
          @click="createOrder"
          label="Оформить Заказ"
          :disabled="buttonDisabled"
          full-width
          margin="mt-7"
        />
      </div>
    </div>
  </div>
</template>
