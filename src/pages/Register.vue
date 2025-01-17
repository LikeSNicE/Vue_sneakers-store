<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import RegisterAuth from '@/components/RegisterAuth.vue'

const email = ref('')
const password = ref('')
const router = useRouter()

const registerUser = async () => {
  try {
    const response = await axios.post('https://647af5741cbcb2a0.mokky.dev/register', {
      email: email.value,
      password: password.value,
    })
    console.log('Успешная регистрация:', response.data)
    // Сохраняем токен в localStorage
    localStorage.setItem('token', response.data.token)
    router.push('/auth')
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
  <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <RegisterAuth
      welcome-text="Создать новый аккаунт"
      other-option="Авторизоваться"
      path-to-other-page="auth"
    />

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="registerUser">
          
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

          <div class="mt-6">
            <button
              type="submit"
              class="bg-lime-500 w-full rounded-xl py-3 text-white font-semibold hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer"
            >
              Создать аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
