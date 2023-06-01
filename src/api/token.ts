import { ENV } from '../utils'
import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

interface TokenData {
  id: number
  iat: number
  exp: number
}
export class Token {
  setToken(token: string) {
    Cookie.set(ENV.TOKEN, token)
    // localStorage.setItem(ENV.TOKEN, token)
  }

  getToken() {
    return Cookie.get(ENV.TOKEN) //localStorage.getItem(ENV.TOKEN)
  }

  removeToken() {
    Cookie.remove(ENV.TOKEN)
    // localStorage.removeItem(ENV.TOKEN)
  }

  hasExpired(token: string) {
    const tokenDecode: TokenData = jwtDecode(token)
    const expireDate = tokenDecode.exp * 1000
    const currentDate = new Date().getTime()

    if (currentDate > expireDate) {
      return true
    } else {
      return false
    }
  }
}
