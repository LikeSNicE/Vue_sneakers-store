<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api, getUserData } from '../services/api'
import BaseButton from '@/components/BaseButton.vue'
import { logout } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/loadingStore'
import { type User } from '@/types/Users'
import { getErrorMessage } from '@/utils/errors'

// Используем ref для одного объекта пользователя, инициализируя его базовой структурой.
// Это предотвратит ошибки в шаблоне до загрузки данных.
const userData = ref<User | null>(null)

const router = useRouter()
const loadingStore = useLoadingStore()

const handleLogOut = () => {
  logout()
  router.push('/auth/login')
}

const updateUserData = async () => {
  // ID теперь всегда доступен в userData.value.id
  if (!userData.value || !userData.value.id) {
    console.error('ID пользователя не найден!')
    return
  }

  loadingStore.startLoading()

  try {
    // Отправляем только те данные, которые могут быть изменены.
    const payload = {
      name: userData.value.userName,
      email: userData.value.email,
    }

    await api.patch(`/users/${userData.value.id}`, payload)
    console.log('Успешно обновленние данных пользователя')
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(`Ошибка [${errorMessage.status}]: ${errorMessage.message}`)

    if (errorMessage.status === 401) {
      handleLogOut()
    }
  } finally {
    loadingStore.stopLoading()
  }
}

onMounted(async () => {
  loadingStore.startLoading()
  try {
    const user = await getUserData()
    if (!user) {
      throw new Error('Данные пользователя не были получены')
    }
    userData.value = user
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
  } finally {
    loadingStore.stopLoading()
  }
})
</script>

<template>
  <div>
    <!-- Используем v-if чтобы форма не отображалась до загрузки данных -->
    <div v-if="userData && userData.id" class="grid grid-cols-2 gap-4">
      <div>
        <label for="userName" class="block mb-2">Имя</label>
        <input
          id="userName"
          v-model="userData.userName"
          type="text"
          class="border focus:outline-none focus:ring-2 focus:ring-lime-600 p-2 w-full rounded-xl"
        />
      </div>

      <div>
        <label for="userEmail" class="block mb-2">Email</label>
        <input
          id="userEmail"
          v-model="userData.email"
          type="email"
          class="border focus:outline-none focus:ring-2 focus:ring-lime-600 p-2 w-full rounded-xl"
          required
        />
      </div>
    </div>
    <!-- Можно добавить скелетон или лоадер, пока userData грузится -->
    <div v-else>
      <p>Загрузка данных пользователя...</p>
    </div>

    <div class="flex gap-2 mt-4">
      <BaseButton
        @click="updateUserData"
        :disabled="loadingStore.isLoading || !userData"
        :isLoading="loadingStore.isLoading"
        label="Сохранить данные"
        class="px-2"
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
