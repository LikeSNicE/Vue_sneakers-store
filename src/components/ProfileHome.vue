<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { authState } from '@/services/auth'
import { getUserData } from '@/services/api'

const router = useRouter()
const userData = ref(null)

// Проверяем авторизацию и получаем данные пользователя
const fetchUser = async () => {
  const data = await getUserData()
  userData.value = data
}

onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/auth') // Перенаправляем на страницу авторизации
  }
  await fetchUser()
})
</script>
<template>
  <h1
  class="text-xl"
  v-if="userData">Привет, {{ userData.userName }}! </h1>
  <p v-else>Загрузка...</p>
  <p class="mt-4">
    Рады видеть тебя снова! Проверь новинки, и любимые модели в твоём профиле.
  </p>
</template>
