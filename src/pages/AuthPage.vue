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

import { Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
    password: z.string().min(1, 'Пароль обязателен').min(8, 'Минимум 8 символов'),
  }),
)

const router = useRouter()

// Функция авторизации пользователя
const loginUser = async (values: Record<string, any>) => {
  const { email, password } = values

  try {
    const registerObj: AuthCredentials = {
      email,
      password,
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
      <Form :validation-schema="validationSchema" class="flex flex-col gap-2" @submit="loginUser">
        <Field name="email" v-slot="{ field, errorMessage }" validateOnValueUpdate>
          <BaseInput
            v-bind="field"
            type="email"
            label="Email"
            placeholder="Введите адрес электронной почты"
            :model-value="field.value"
            @update:modelValue="field.onChange"
            :error="errorMessage"
          />
        </Field>

        <Field name="password" v-slot="{ field, errorMessage }" validateOnValueUpdate>
          <BaseInput
            v-bind="field"
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            :model-value="field.value"
            @update:modelValue="field.onChange"
            :error="errorMessage"
          />
        </Field>

        <BaseButton type="submit" label="Войти" class="mt-3" />
      </Form>
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
