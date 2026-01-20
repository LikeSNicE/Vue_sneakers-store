<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import BaseButton from '@/components/BaseButton.vue'

import AuthSlot from '@/components/AuthSlot.vue'
import { getErrorMessage } from '@/utils/errors'
import BaseInput from '@/components/BaseInput.vue'
import { type RegisterCredentials } from '@/types/Users'
import { Field, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from '@/validation/authSchema'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const onSubmit = handleSubmit((values) => {
  registerUser(values)
})

const registerUser = async (values: RegisterCredentials): Promise<void> => {
  const { email, password, userName } = values

  try {
    const registerFields = {
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
      <form class="flex flex-col gap-2" @submit="onSubmit">
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

        <BaseButton type="submit" class="mt-3 w-full">Создать аккаунт</BaseButton>
      </form>
    </template>

    <template #link>
      <RouterLink class="flex justify-center underline mt-5 text-sm sm:text-base" to="/auth/login">
        Авторизация
      </RouterLink>
    </template>
  </AuthSlot>
</template>
