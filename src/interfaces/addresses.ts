export interface IAddresses {
  id: number
  attributes: IAttributesAddress
}

export type IAttributesAddress = {
  title: string
  name: string
  address: string
  city: string
  state: string
  postal_code: string
  phone: string
}
