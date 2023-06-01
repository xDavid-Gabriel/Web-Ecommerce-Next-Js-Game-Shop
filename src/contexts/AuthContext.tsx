import { FC, PropsWithChildren, createContext, useEffect } from 'react'
import { useState } from 'react'
import { Token, User } from '../api'
import { useRouter } from 'next/router'
import { IUser } from '../interfaces'

interface ContextProps {
  accessToken: string
  user: IUser
  login: (token: string) => Promise<void>
  logout: () => void
  updateUser: (key: any, value: any) => void
}

const tokenCtrl = new Token()
const userCtrl = new User()

export const AuthContext = createContext({} as ContextProps)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    name: '',
    createdAt: '',
  })
  const [token, setToken] = useState('')
  // const [loading, setLoading] = useState(true)

  //Checkea la token si hay, si no hay o expira de deslogea
  useEffect(() => {
    const checkToken = async () => {
      const token = tokenCtrl.getToken()
      if (!token) {
        logout()
        // setLoading(false)
        return
      }

      if (tokenCtrl.hasExpired(token)) {
        logout()
      } else {
        await login(token)
      }
    }

    checkToken()
  }, [])
  const login = async (token: string) => {
    try {
      // Setear el token en el localStorage
      tokenCtrl.setToken(token)

      // Obtener los datos del usuario
      const response = await userCtrl.getMe()
      console.log(response)

      // Setear los datos del usuario en el state user

      setUser(response)
      setToken(token)
      // setLoading(false)
    } catch (error) {
      console.log(error)
      // setLoading(false)
    }
  }
  //Cerrando sesión
  const logout = () => {
    tokenCtrl.removeToken()
    setToken('')
    setUser({
      email: '',
      username: '',
      name: '',
      createdAt: '',
    })
    // router.push('/join/sign-in')
  }
  const updateUser = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value,
    })
  }
  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  }
  // if (loading) return null
  return (
    <AuthContext.Provider value={{ ...data }}>{children}</AuthContext.Provider>
  )
}
