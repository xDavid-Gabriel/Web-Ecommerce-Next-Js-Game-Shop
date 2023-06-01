import axios from 'axios'
import { ENV } from '../utils'

export class Platform {
  async getAll() {
    try {
      const sort = 'sort=order:asc'
      const populate = 'populate=icon'
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${populate}&${sort}`
      const { data } = await axios.get(url)

      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  async getBySlug(slug: string) {
    try {
      const filters = `filters[slug][$eq]=${slug}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${filters}`

      const { data } = await axios.get(url)

      if (!data) {
        throw new Error('No data')
      }
      return data.data[0]
    } catch (error) {
      throw error
    }
  }
}
