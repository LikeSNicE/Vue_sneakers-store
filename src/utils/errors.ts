import axios from 'axios'

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
