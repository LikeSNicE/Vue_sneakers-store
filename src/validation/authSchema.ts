import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
  password: z.string().min(1, 'Поле обязательно').min(8, 'Пароль должен быть не меньше 8 символов'),
})

export const registerSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
  password: z.string().min(1, 'Поле обязательно').min(8, 'Пароль должен быть не меньше 8 символов'),
  userName: z.string().min(1, 'Поле обязательно'),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
