import { IAttributesAddress } from '../interfaces'
import { ENV, authFetch } from '../utils'

export class Address {
  async create(data: IAttributesAddress, userId: number) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`

      const response = await authFetch(url, {
        method: 'POST',
        data: {
          data: {
            ...data,
            user: userId,
          },
        },
      })
      if (!response) {
        throw 'Error'
      }
      return response
    } catch (error) {
      throw error
    }
  }

  async getAll(userId: number) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`

      const response = await authFetch(url)
      if (!response) {
        throw 'Error'
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(data: IAttributesAddress, addressId: number) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`
      const response = await authFetch(url, {
        method: 'PUT',
        data: {
          data: {
            ...data,
          },
        },
      })
      if (!response) {
        throw 'Error'
      }
      return response
    } catch (error) {
      throw error
    }
  }

  async delete(addressId: number) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`
      const response = await authFetch(url, {
        method: 'DELETE',
      })
      if (!response) {
        throw 'Error'
      }
      return response
    } catch (error) {
      throw error
    }
  }
}
