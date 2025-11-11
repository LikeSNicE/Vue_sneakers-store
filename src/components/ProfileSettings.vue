<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { base_url, fetchUser } from '@/services/api'
import BaseButton from '../components/BaseButton.vue'
import { logout } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/loadingStore'

const userData = ref({
  userName: '',
  email: '',
  avatar: '',
})

const router = useRouter()
const loadingStore = useLoadingStore()

const updateUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Токен отсутствует!')
    return
  }

  loadingStore.startLoading()

  try {
    await axios.patch(`${base_url}/users/${userData.value.id}`, userData.value)
  } catch (error) {
    console.error('Ошибка обновления данных:', error.message)
  } finally {
    loadingStore.stopLoading()
  }
}

const handleLogOut = () => {
  logout()
  router.push('/auth/login')
}

onMounted(async () => {
  await fetchUser(userData)
})
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block mb-2">Имя</label>
        <input
          v-model="userData.userName"
          type="text"
          class="border focus:outline-none focus:ring-2 focus:ring-lime-600 p-2 w-full rounded-xl"
        />
      </div>

      <div>
        <label class="block mb-2">Email</label>
        <input
          v-model="userData.email"
          type="email"
          class="border focus:outline-none focus:ring-2 focus:ring-lime-600 p-2 w-full rounded-xl"
          required
        />
      </div>
    </div>

    <div class="flex gap-2 mt-4">
      <BaseButton
        @click="updateUserData"
        :disabled="loadingStore.isLoading"
        :isLoading="loadingStore.isLoading"
        label="Сохранить данные"
        padding="px-2"
      />
      <button
        @click="handleLogOut"
        class="bg-red-700 text-white p-1.5 rounded-xl w-20 hover:bg-[#E2062C]"
      >
        Выйти
      </button>
    </div>
  </div>
</template>
