import { type Sneakers } from './Sneakers'

export interface SneakersOrders {
  id: number
  items: Sneakers[]
  totalPrice: number
  userId: number
}

export type BaseOrder = Pick<SneakersOrders, 'id' | 'items' | 'totalPrice'>

export interface SneakersOrdersParams {
  userId: number
  _relations: string
}
