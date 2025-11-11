<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'
import { base_url } from '@/services/api'
import { getUserIdFromToken } from '@/services/api'
import { useLoadingStore } from '@/stores/loadingStore'
import ProfileOrdersSkeleton from '@/components/ProfileOrdersSkeleton.vue'
import NoOrders from '@/components/NoOrders.vue'
import CardWideList from './CardWideList.vue'
import TitleBaseSlot from './TitleBaseSlot.vue'

const loadingStore = useLoadingStore()
const userOrders = ref([])

const fetchOrders = async () => {
  try {
    loadingStore.startLoading()
    const token = localStorage.getItem('token')
    const userId = getUserIdFromToken(token)

    if (!userId) {
      throw new Error('ID пользователя не найден')
    }

    const { data } = await axios.get(`${base_url}/orders`, {
      params: {
        userId, // Получаем только заказы текущего пользователя
        _relations: 'items', // Если нужно связать с items
      },
    })

    userOrders.value = data.sort((a, b) => b.id - a.id)
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
    <!-- <h5 class="font-bold text-2xl mb-4">Личные заказы</h5> -->
    <TitleBaseSlot>Личные заказы</TitleBaseSlot>

    <ProfileOrdersSkeleton v-if="loadingStore.isLoading" />

    <div v-else-if="userOrders.length === 0">
      <NoOrders />
    </div>

    <div
      v-else-if="!loadingStore.isLoading"
      v-for="order in userOrders"
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
