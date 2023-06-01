export interface IOrder {
  id: number
  attributes: IOrderAttributes
}

export interface IOrderAttributes {
  createdAt: Date
  totalPayment: number
  idPayment: string
  addressShipping: AddressShipping
  products: Product[]
  updatedAt: Date
}

export interface AddressShipping {
  address: string
  updated_at: Date
  city: string
  phone: string
  name: string
  created_at: Date
  state: string
  postal_code: string
  title: string
}

export interface Product {
  category_id: null
  description: string
  id: string
  picture_url: string
  quantity: string
  title: string
  unit_price: string
}
