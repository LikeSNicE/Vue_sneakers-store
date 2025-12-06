<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'
import AuthSlot from '@/components/AuthSlot.vue'

// Рефы для полей формы
const email = ref('')
const password = ref('')

const router = useRouter()

// Функция авторизации пользователя
const loginUser = async () => {
  try {
    // Отправляем запрос на авторизацию
    const response = await api.post(
      `/auth`,
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200 || response.status === 201) {
      const token = response.data.token

      login(token)
      router.push('/')
    } else {
      alert('Ошибка авторизации.')
    }
  } catch (error) {
    if (error.response) {
      // Обрабатываем ошибки от API
      alert(`Ошибка авторизации: ${error.response.data.message || error.response.statusText}`)
    } else {
      alert('Произошла ошибка. Проверьте подключение к серверу.')
    }
  }
}
</script>

<template>
  <AuthSlot>
    <template #title-form> Войти </template>
    <template #form>
      <form class="flex flex-col gap-2" @submit.prevent="loginUser">
        <div class="flex flex-col gap-1">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            placeholder="user@example.com"
            type="email"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition sm:text-sm"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="********"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition sm:text-sm"
          />
        </div>

        <BaseButton type="submit" label="Войти" class="mt-3" />
      </form>
    </template>
    <template #link>
      <RouterLink
        class="flex justify-center underline mt-5 text-sm sm:text-base"
        to="/auth/register"
      >
        Регистрация
      </RouterLink>
    </template>
  </AuthSlot>
</template>
