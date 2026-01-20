<script setup lang="ts">
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'
import AuthSlot from '@/components/AuthSlot.vue'
import { getErrorMessage } from '@/utils/errors'
import BaseInput from '@/components/BaseInput.vue'
import { type AuthCredentials } from '@/types/Users'
import { loginSchema } from '@/validation/authSchema'

import { Field, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = handleSubmit((values) => {
  loginUser(values)
})

const router = useRouter()

// Функция авторизации пользователя
const loginUser = async (values: AuthCredentials) => {
  const { email, password } = values

  try {
    const loginUserFields = {
      email,
      password,
    }

    const response = await api.post(`/auth`, loginUserFields as AuthCredentials, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 200 || response.status === 201) {
      await router.push('/')
      const { token } = response.data
      login(token)
      console.log(values)
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
      <form @submit="onSubmit" class="flex flex-col gap-2">
        <Field name="email" v-slot="{ field, errorMessage }">
          <BaseInput
            type="email"
            label="Email"
            placeholder="Введите адрес электронной почты"
            :model-value="field.value"
            @update:modelValue="field.onChange"
            :error="errorMessage"
          />
        </Field>

        <Field name="password" v-slot="{ field, errorMessage }">
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

        <BaseButton type="submit" class="mt-3 w-full">Войти</BaseButton>
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
