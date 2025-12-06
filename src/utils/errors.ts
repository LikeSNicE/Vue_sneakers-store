/**
 * Извлекает сообщение об ошибке из переменной типа unknown.
 * @param error - Перехваченная ошибка типа unknown.
 * @returns Строка с сообщением об ошибке.
 */

import axios from 'axios'

// const getErrorMessage = (error: unknown): string => {
//   let message: string

//   if (error instanceof Error) {
//     // Это стандартный объект ошибки, у него есть свойство message
//     message = error.message
//   } else if (typeof error === 'string') {
//     // Ошибка была брошена как строка
//     message = error
//   } else if (error && typeof error === 'object' && 'message' in error) {
//     // Обработка случая, когда брошен объект с свойством message
//     // (например, из библиотеки axios)
//     message = String((error as { message: unknown }).message)
//   } else {
//     // Неизвестный тип ошибки
//     message = 'Произошла непредвиденная ошибка.'
//   }

//   return message
// }

// export { getErrorMessage }

interface ApiError {
  message: string
  status?: number
  code?: string
}

export const getErrorMessage = (error: unknown): ApiError => {
  const defaultError: ApiError = {
    message: 'Произошла непревдиденная ошибка',
    status: 500,
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as any

    switch (status) {
      case 401:
        return {
          message: data?.message || 'Сессия истекла. Пожалуйста, войдите снова.',
          status: 401,
          code: 'UNAUTHORIZED',
        }
    }
  }

  if (error instanceof Error) {
    defaultError.message = error.message
  }

  if (typeof error === 'string') {
    defaultError.message = error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    defaultError.message = String((error as { message: unknown }).message)
  }

  return defaultError
}
