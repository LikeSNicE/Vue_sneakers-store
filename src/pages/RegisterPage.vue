<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'

import AuthSlot from '@/components/AuthSlot.vue'
import { getErrorMessage } from '@/utils/errors'
import BaseInput from '@/components/BaseInput.vue'
import { type RegisterCredentials } from '@/types/Users'

const email = ref('')
const password = ref('')
const userName = ref('')
const router = useRouter()

const registerUser = async (): Promise<void> => {
  try {
    const registerFields: RegisterCredentials = {
      email: email.value,
      userName: userName.value,
      password: password.value,
    }

    const response = await api.post(`/register`, registerFields as RegisterCredentials)

    if (response.status === 200 || response.status === 201) {
      const { token } = response.data
      localStorage.setItem('token', token)
      await router.push('/auth/login')
    } else {
      console.log(`Ошибка регистрации. ${response.statusText}`)
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
  }
}
</script>

<template>
  <AuthSlot>
    <template #title-form> Регистрация </template>
    <template #form>
      <form class="flex flex-col gap-2" @submit.prevent="registerUser">
        <BaseInput label="Имя пользователя" placeholder="Введите ваше имя" v-model="userName" />

        <BaseInput label="Email" placeholder="user@example.com" type="email" v-model="email" />

        <BaseInput label="Пароль" placeholder="********" v-model="password" type="password" />

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
