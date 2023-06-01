import { ENV, authFetch } from '../utils'

export class Wishlist {
  async check(
    userId: number | string | undefined,
    gameId: number | string | undefined,
  ) {
    try {
      const filterUser = `filters[user][id][$eq][0]=${userId}`
      const filterGame = `filters[game][id][$eq][1]=${gameId}`
      const urlParams = `${filterUser}&${filterGame}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`

      const { data } = await authFetch(url, {
        method: 'GET',
      })

      if (!data) {
        throw new Error('No data')
      }
      if (data.length === 0) {
        return false
      }
      return data[0]
    } catch (error) {
      throw error
    }
  }

  async add(
    userId: number | string | undefined,
    gameId: number | string | undefined,
  ) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`

      const { data } = await authFetch(url, {
        method: 'POST',
        data: {
          data: {
            user: userId,
            game: gameId,
          },
        },
      })

      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }
  async delete(id: number | string | undefined) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${id}`

      const { data } = await authFetch(url, {
        method: 'DELETE',
      })

      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  async getAll(userId: number | string | undefined) {
    try {
      const filterUser = `filters[user][id][$eq]=${userId}`
      const populate = 'populate[0]=game&populate[1]=game.cover'
      const urlParams = `${filterUser}&${populate}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`
      const { data } = await authFetch(url, {
        method: 'GET',
      })

      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
