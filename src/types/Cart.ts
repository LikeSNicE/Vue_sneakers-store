import { type Sneakers } from './Sneakers'

export type CartItem = Sneakers & {
  quantity: number
}
