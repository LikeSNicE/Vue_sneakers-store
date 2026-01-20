<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api } from '@/services/api'
import { getUserIdFromToken } from '@/services/api'
import { useLoadingStore } from '@/stores/loadingStore'
import ProfileOrdersSkeleton from '@/components/ProfileOrdersSkeleton.vue'
import NoOrders from '@/components/NoOrders.vue'
import CardWideList from './CardWideList.vue'
import TitleBaseSlot from './TitleBaseSlot.vue'
import { type SneakersOrdersParams, SneakersOrders } from '@/types/Orders'
import { SneakersCart } from '@/types/Sneakers'

const loadingStore = useLoadingStore()
const userOrders = ref<SneakersOrders<SneakersCart>[] | null>(null)

//  computed свойство для сортировки заказов
const sortedOrders = computed(() => {
  if (!userOrders.value) {
    return []
  }
  return [...userOrders.value].sort((a, b) => b.id - a.id)
})

const fetchOrders = async () => {
  try {
    loadingStore.startLoading()
    const token = localStorage.getItem('token')
    const userId = getUserIdFromToken(token)

    if (!userId) {
      throw new Error('ID пользователя не найден')
    }

    const ordersParams: SneakersOrdersParams = {
      userId,
      _relations: 'items',
    }

    const { data } = await api.get<SneakersOrders<SneakersCart>[]>(`/orders`, {
      params: ordersParams,
    })
    console.log('data from orders: ', data)
    userOrders.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}

onMounted(fetchOrders)
</script>

<template>
  <div>
    <TitleBaseSlot>Личные заказы</TitleBaseSlot>

    <ProfileOrdersSkeleton v-if="loadingStore.isLoading" />

    <div v-else-if="!loadingStore.isLoading && sortedOrders.length === 0">
      <NoOrders />
    </div>

    <!-- Используем отсортированный массив sortedOrders для рендеринга -->
    <div
      v-else-if="!loadingStore.isLoading"
      v-for="order in sortedOrders"
      :key="order.id"
      class="border-2 rounded-2xl my-4"
    >
      <h4 class="text-xl border-b-2 py-2 px-4">Заказ: {{ order.id }}</h4>

      <CardWideList :items="order.items" />

      <p class="text-right border-t-2 py-2 px-4">
        Итого <b>{{ order.totalPrice }} </b> тенге.
      </p>
    </div>
  </div>
</template>
