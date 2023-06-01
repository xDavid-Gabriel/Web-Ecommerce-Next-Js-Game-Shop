import { PurpleAttributes } from './games'

export interface ICartItem {
  id: number
  quantity: number
  attributes?: PurpleAttributes
}
