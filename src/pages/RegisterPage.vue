<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'

import AuthSlot from '@/components/AuthSlot.vue'
import { getErrorMessage } from '@/utils/errors'
import BaseInput from '@/components/BaseInput.vue'
import { type RegisterCredentials } from '@/types/Users'
import z from 'zod'
import { Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const email = ref('')
const password = ref('')
const userName = ref('')
const router = useRouter()

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
    password: z
      .string()
      .min(1, 'Поле обязательно')
      .min(8, 'Пароль должен быть не меньше 8 символов'),
    userName: z.string().min(1, 'Поле обязательно'),
  }),
)

const registerUser = async (values: Record<string, any>): Promise<void> => {
  const { email, password, userName } = values

  try {
    const registerFields: RegisterCredentials = {
      email,
      userName,
      password,
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
      <Form
        class="flex flex-col gap-2"
        :validation-schema="validationSchema"
        @submit="registerUser"
      >
        <Field name="userName" v-slot="{ field, errorMessage }">
          <BaseInput
            label="Имя пользователя"
            placeholder="Введите ваше имя"
            :model-value="field.value"
            type="text"
            @update:model-value="field.onChange"
            :error="errorMessage"
          />
        </Field>
        <Field name="email" v-slot="{ field, errorMessage }">
          <BaseInput
            label="Email"
            placeholder="Введите ваш email"
            :model-value="field.value"
            type="email"
            @update:model-value="field.onChange"
            :error="errorMessage"
          />
        </Field>
        <Field name="password" v-slot="{ field, errorMessage }">
          <BaseInput
            label="Пароль"
            placeholder="********"
            :model-value="field.value"
            type="password"
            @update:model-value="field.onChange"
            :error="errorMessage"
          />
        </Field>

        <BaseButton type="submit" label="Создать аккаунт" class="mt-3 w-full"></BaseButton>
      </Form>
    </template>

    <template #link>
      <RouterLink class="flex justify-center underline mt-5 text-sm sm:text-base" to="/auth/login">
        Авторизация
      </RouterLink>
    </template>
  </AuthSlot>
</template>
