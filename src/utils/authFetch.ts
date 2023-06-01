import axios, { AxiosRequestConfig } from 'axios'
import { Token } from '../api'

interface AuthFetchParams extends AxiosRequestConfig {
  data?: Record<string, unknown>
}

export const authFetch = async (url: string, params?: AuthFetchParams) => {
  //El params es opcional ya que solamente estara disponible en esta funcion nada mas
  const tokenCtrl = new Token()
  const token = tokenCtrl.getToken()

  const logout = () => {
    tokenCtrl.removeToken()
    window.location.replace('/')
  }

  //Si no hya una token nos deslogeamos
  if (!token) {
    // logout
    logout()
    return
  }

  //Si la token expira nos deslogeamos
  if (tokenCtrl.hasExpired(token)) {
    logout()
    return
  }

  const headers = {
    ...params?.headers,
    Authorization: `Bearer ${token}`,
  }

  const config: AxiosRequestConfig = {
    ...params,
    headers,
  }

  if (params?.data) {
    config.data = params.data
  }

  try {
    const response = await axios(url, config)
    return response.data
  } catch (error) {
    throw error
  }
}
