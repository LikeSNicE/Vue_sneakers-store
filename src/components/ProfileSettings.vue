<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { base_url, getUserData } from '@/services/api'
import BaseButton from './BaseButton.vue'

const userData = ref({
  userName: '',
  email: '',
})

const userId = ref(null)
const isLoading = ref(false)

const fetchUser = async () => {
  const data = await getUserData()
  userData.value = data
  userId.value = data.id
}

const updateUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Токен отсутствует!')
    return
  }

  isLoading.value = true

  try {
    const { data } = await axios.patch(`${base_url}/users/${userId.value}`, userData.value)
    console.log('Обновленные данные пользователя:', data)
  } catch (error) {
    console.error('Ошибка обновления данных:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUser)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block mb-2">Имя</label>
      <input v-model="userData.userName" type="text" class="border p-2 w-full" />
    </div>

    <div>
      <label class="block mb-2">Email</label>
      <input v-model="userData.email" type="email" class="border p-2 w-full" required />
    </div>
  </div>

  <BaseButton
    @click="updateUserData"
    :disabled="isLoading"
    :isLoading="isLoading"
    margin="mt-4"
    label="Сохранить данные"
    padding="px-2"
  />
</template>
