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

export type SneakersCard = Pick<
  Sneakers,
  'id' | 'title' | 'price' | 'imageUrl' | 'isFavorite' | 'isAdded'
>

export type SneakersCardWide = Omit<Sneakers, 'isAdded' | 'isFavorite' | 'favoriteId'>
