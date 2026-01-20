<script setup lang="ts">
import { ref, computed } from 'vue'
import { api, getUserIdFromToken } from '../services/api'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './infoBlock.vue'
import BaseButton from './BaseButton.vue'

import { type SneakersCart } from '@/types/Sneakers'
import { useLoadingStore } from '@/stores/loadingStore'
import { useCartStore } from '@/stores/CartStore'
import { getErrorMessage } from '@/utils/errors'

const props = defineProps<{
  totalPrice: number
  vatPrice: number
}>()

type Orders<T> = {
  id: number
  items: T[]
  totalPrice: number
  userId: number
}

const loadingStore = useLoadingStore()
const cartStore = useCartStore()

const isCreating = ref(false)
const orderId = ref<number | null>(null)
const totalOrderPrice = ref<number | null>(null)

const createOrder = async (): Promise<void> => {
  loadingStore.startLoading()

  try {
    isCreating.value = true
    const token = localStorage.getItem('token')
    const userId = getUserIdFromToken(token)

    if (!userId) {
      throw new Error('Пользователь не найден')
    }

    const { data } = await api.post<Orders<SneakersCart>>(`/orders`, {
      items: cartStore.cart,
      totalPrice: props.totalPrice,
      userId,
    })

    console.log(data)

    cartStore.clearCart()

    // return data
    orderId.value = data.id
    totalOrderPrice.value = data.totalPrice
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
  } finally {
    isCreating.value = false
    loadingStore.stopLoading()
  }
}

const cartIsEmpty = computed(() => cartStore.cart.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="overflow-y-hidden">
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div
      class="bg-white w-96 h-full top-0 right-0 fixed z-20 p-8 max-[768px]:w-full"
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
        <button @click="cartStore.clearCart()" class="bg-gray-200 py-2 px-4 rounded-lg mb-2">
          Очистить корзину
        </button>
        <CartItemList />
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span>Итого: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} Тенге</b>
          </div>

          <div class="flex gap-2">
            <span>НДС: 16%</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} Тенге</b>
          </div>

          <BaseButton @click="createOrder" :disabled="buttonDisabled" class="mt-7 w-full">
            Оформить Заказ</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
