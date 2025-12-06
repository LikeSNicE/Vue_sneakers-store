export interface Sneakers {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
  favoriteId: null
}

export interface IItemsParams {
  sortBy: string
  title?: string
}
