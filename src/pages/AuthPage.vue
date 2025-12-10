<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'
import AuthSlot from '@/components/AuthSlot.vue'
import { getErrorMessage } from '@/utils/errors'
import BaseInput from '@/components/BaseInput.vue'

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
