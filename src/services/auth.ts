import { reactive } from 'vue'

const authState = reactive({
  isAuthenticated: !!localStorage.getItem('token'),
})

const login = (token: string) => {
  localStorage.setItem('token', token)
  authState.isAuthenticated = true
}

const logout = () => {
  localStorage.removeItem('token')
  authState.isAuthenticated = false
}

export { authState, login, logout }
