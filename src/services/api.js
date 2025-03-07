import axios from 'axios'

const base_url = 'https://647af5741cbcb2a0.mokky.dev'

//getToken
const getUserIdFromToken = (token) => {
  if (!token) {
    console.error('Токен отсутсвует')
    return null
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) // Декодируем токен
    return payload.id || null // Возвращаем правильное поле
  } catch (e) {
    console.error('Ошибка при декодировании токена:', e)
    return null
  }
}

const getUserData = async () => {
  const token = localStorage.getItem('token')
  const userId = getUserIdFromToken(token)

  try {
    if (!userId) return null

    const { data } = await axios.get(`${base_url}/users/${userId}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error.message)
    return null
  }
}

export { base_url, getUserIdFromToken, getUserData }
