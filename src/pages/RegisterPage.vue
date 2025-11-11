<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { base_url } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'

import AuthSlot from '@/components/AuthSlot.vue'

const email = ref('')
const password = ref('')
const userName = ref('')
const router = useRouter()

const registerUser = async () => {
  try {
    const response = await axios.post(`${base_url}/register`, {
      email: email.value,
      userName: userName.value,
      password: password.value,
    })
    localStorage.setItem('token', response.data.token)
    router.push('/auth/login')
  } catch (error) {
    if (error.response) {
      console.error('Ошибка регистрации:', error.response.data)
    } else {
      console.error('Ошибка подключения:', error)
    }
  }
}
</script>

<template>
  <AuthSlot>
    <template #title-form> Регистрация </template>
    <template #form>
      <form class="flex flex-col gap-2" @submit.prevent="registerUser">
        <div class="flex flex-col gap-1">
          <label for="username" class="block text-sm font-medium text-gray-700">Имя</label>
          <input
            id="username"
            v-model="userName"
            placeholder="Введите ваше имя"
            type="text"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition sm:text-sm"
          />
        </div>

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

        <BaseButton type="submit" label="Создать аккаунт" class="mt-3" />
      </form>
    </template>

    <template #link>
      <RouterLink class="flex justify-center underline mt-5 text-sm sm:text-base" to="/auth/login">
        Авторизация
      </RouterLink>
    </template>
  </AuthSlot>
</template>
