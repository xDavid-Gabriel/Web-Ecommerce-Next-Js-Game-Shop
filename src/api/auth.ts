import { ENV } from '../utils'
import axios from 'axios'

interface RegisterData {
  username: string
  email: string
  name: string
  password: string
}

interface LoginData {
  identifier: string
  password: string
}
export class Auth {
  async register(data: RegisterData) {
    try {
      const response = await axios.post(
        `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`,
        data,
      )
      if (!response) {
        throw new Error('Error al registrar')
      }
      return response
    } catch (error) {
      throw error
    }
  }

  async login(data: LoginData) {
    try {
      const response = await axios.post(
        `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`,
        data,
      )
      if (!response) {
        throw new Error('Error al hacer login')
      }
      return response
    } catch (error) {
      throw error
    }
  }
}
