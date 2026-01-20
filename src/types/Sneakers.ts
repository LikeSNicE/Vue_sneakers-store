export interface Sneakers {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
  favoriteId: null
}

export interface ItemsParams {
  sortBy?: string
  title?: string
  page?: string | number
  limit?: string | number
}

export interface SneakersCart extends Sneakers {
  quantity: number
}

export type CardList<T> = {
  items: T[]
  isFavorites: boolean
}

export type SneakersCardWide = Omit<SneakersCart, 'isAdded' | 'isFavorite' | 'favoriteId'>
