<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import axios from 'axios'
import CardList from '@/components/CardList.vue'
import { base_url } from '@/services/api'
import { getUserIdFromToken } from '@/services/api'

const userOrders = ref([])

const fetchOrders = async () => {
  try {
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
  }
}

onMounted(fetchOrders)
</script>

<template>
  <div>
    <h3 class="text-3xl mb-4">Ваши заказы :</h3>
    <div class="font-bold text-2xl" v-if="userOrders.length === 0">
      К сожалению вы не сделали еще заказы
    </div>

    <div v-for="order in userOrders" :key="order.id" class="mb-8">
      <div class="flex mb-4">
        <h1 class="text-xl">ID заказа: {{ order.id }}</h1>
        <h2 class="ml-auto">
          Общая сумма заказа <b>{{ order.totalPrice }} </b> тенге.
        </h2>
      </div>
      <CardList :items="order.items" isFavorites />
    </div>
  </div>
</template>
