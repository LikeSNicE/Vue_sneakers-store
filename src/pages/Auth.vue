<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import RegisterAuth from '@/components/RegisterAuth.vue'

// Рефы для полей формы
const email = ref('')
const password = ref('')

const router = useRouter()

// Функция авторизации пользователя
const loginUser = async () => {
  try {
    // Отправляем запрос на авторизацию
    const response = await axios.post(
      'https://647af5741cbcb2a0.mokky.dev/auth',
      {
        email: email.value, // Передаем email
        password: password.value, // Передаем пароль
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
      // Сохраняем токен в localStorage
      localStorage.setItem('token', token)
      alert('Вы успешно вошли в систему!')
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
  <div class="contain bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden bg-white">
      <!-- <h2 class="text-2xl uppercase font-medium text-center mb-1">Вход</h2>
      <p class="text-gray-600 mb-6 text-sm text-center">Рады видеть снова!</p> -->
      <RegisterAuth welcome-text="Вход" />
      <form @submit.prevent="loginUser" autocomplete="off">
        <label for="email" class="block text-sm font-medium leading-5 text-gray-700 mb-2">
          Email address
        </label>
        <input
          id="email"
          v-model="email"
          placeholder="user@example.com"
          type="email"
          required
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />

        <div class="mt-6">
          <label for="password" class="block text-sm font-medium leading-5 text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
        <div class="mt-4">
          <button
            type="submit"
            class="bg-lime-500 w-full rounded-xl py-3 text-white font-semibold hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer"
          >
            Вход
          </button>
          <div class="flex gap-2 pt-5 items-center">
            <p class="text-gray-600 text-sm">Нет аккаунта, тогда зарегистрируйтесь?</p>
            <router-link to="/register">
              <div
                class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Регистрация здесь
              </div>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
