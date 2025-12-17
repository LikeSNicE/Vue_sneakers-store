<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'
import AuthSlot from '@/components/AuthSlot.vue'
import { getErrorMessage } from '@/utils/errors'
import BaseInput from '@/components/BaseInput.vue'
import { type AuthCredentials } from '@/types/Users'

// Рефы для полей формы
const email = ref('')
const password = ref('')

const router = useRouter()

// Функция авторизации пользователя
const loginUser = async (): Promise<void> => {
  try {
    const registerObj: AuthCredentials = {
      email: email.value,
      password: password.value,
    }

    // Отправляем запрос на авторизацию
    const response = await api.post(`/auth`, registerObj as AuthCredentials, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 200 || response.status === 201) {
      const { token } = response.data

      login(token)
      await router.push('/')
    } else {
      console.log(`Ошибка авторизации. ${response.statusText}`)
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
  }
}
</script>

<template>
  <AuthSlot>
    <template #title-form> Войти </template>
    <template #form>
      <form class="flex flex-col gap-2" @submit.prevent="loginUser">
        <BaseInput label="Email" placeholder="user@example.com" type="email" v-model="email" />

        <BaseInput label="Пароль" placeholder="********" v-model="password" type="password" />

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
