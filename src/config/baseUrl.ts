// Base URL для локальных файлов (маршрутизация Vite)
export const BASE_URL = import.meta.env.BASE_URL

// Base URL для API запросов
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://647af5741cbcb2a0.mokky.dev'
