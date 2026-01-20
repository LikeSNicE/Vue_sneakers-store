export interface User {
  id: string
  email: string
  userName: string
  password?: string
}

export type AuthCredentials = Pick<User, 'email' | 'password'>
export type RegisterCredentials = Omit<User, 'id'>
