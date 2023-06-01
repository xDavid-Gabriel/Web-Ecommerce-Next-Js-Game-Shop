import { ENV, authFetch } from '../utils'

export class Order {
  async getAll(userId: number) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`
      const sort = 'sort[0]=createdAt:desc'
      const urlParams = `${filters}&${sort}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`
      const response = await authFetch(url)

      if (!response) {
        throw new Error('Error al traer la data')
      }

      return response
    } catch (error) {
      throw error
    }
  }
}
