export interface SneakersOrders<T> {
  id: number
  items: T[]
  totalPrice: number
  userId: number
}

export interface SneakersOrdersParams {
  userId: number
  _relations: string
}
