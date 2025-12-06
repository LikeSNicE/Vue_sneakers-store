import { type Sneakers } from './sneakers'

export interface SneakersOrders {
  id: number
  items: Sneakers[]
  totalPrice: number
  userId: number
}

export interface SneakersOrdersParams {
  userId: number
  _relations: string
}
