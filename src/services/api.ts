import axios from 'axios'
import { useLoadingStore } from '@/stores/loadingStore'
import { getErrorMessage } from '@/utils/errors'

const base_url = 'https://647af5741cbcb2a0.mokky.dev'

// apiInstance

const api = axios.create({
  baseURL: base_url,
})

//getToken
const getUserIdFromToken = (token: string | null) => {
  if (!token) {
    console.error('Токен отсутсвует')
    return null
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) // Декодируем токен
    return payload.id || null // Возвращаем правильное поле
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
  }
}

const getUserData = async () => {
  const token = localStorage.getItem('token')
  const userId = getUserIdFromToken(token)
  const loadingStore = useLoadingStore()

  try {
    loadingStore.startLoading()
    if (!userId) return null
    const { data } = await api.get(`/users/${userId}`)
    console.log(data)
    return data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    console.log(errorMessage)
  } finally {
    loadingStore.stopLoading()
  }
}

export { api, getUserIdFromToken, getUserData }
