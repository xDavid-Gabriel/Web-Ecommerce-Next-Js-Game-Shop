import { ENV, authFetch } from '../utils'

import { IUser } from '../interfaces/user'

export class User {
  //Me trae el usuario
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`
      const response = await authFetch(url)

      // const response = await axios.get(url, {
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY4MjM4NDY2NCwiZXhwIjoxNjg0OTc2NjY0fQ.k8gPabGb13xRshEi9jG5HkTDohzxDIgBl1Gf48yYGuQ`,
      //   },
      // })

      if (!response) {
        throw new Error('Error al obtener usuario')
      }
      return response
    } catch (error) {
      throw error
    }
  }

  async updateMe(userId: number, data: IUser) {
    //actualiza el usuario con axios
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`

      const response = await authFetch(url, { method: 'PUT', data })
      if (!response) {
        throw new Error('El servidor no ha devuelto datos')
      }

      return response
    } catch (error) {
      throw error
    }
  }
}
