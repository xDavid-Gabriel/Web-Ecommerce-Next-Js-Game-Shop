import { IAddresses, IAttributesAddress, ICartItem, IUser } from '../interfaces'
import { authFetch, ENV } from '../utils'
import Cookie from 'js-cookie'
import { AES, enc } from 'crypto-js'
const secret = process.env.NEXT_PUBLIC_CART_SECRET?.toString()!
export class Cart {
  add(gameId: number) {
    const games: ICartItem[] = this.getAll()
    //Trae solamente si existe por medio del id, si no trae "-1" si no existe
    const objIndex = games.findIndex(game => game.id === gameId)

    let updatedGames: ICartItem[]

    //Si este es menor a 0, significa que no existe por ende es "-1" y agrega al carrito
    if (objIndex < 0) {
      //la variable "updatedGames" traera todo lo que hay en el array "games" si no hay nada igual, pondra el "id" y el "quantity"  por defecto el "quantity" en 1 para decir que agrego un producto al carrito
      updatedGames = [...games, { id: gameId, quantity: 1 }]
    } else {
      updatedGames = games.map(game => {
        if (game.id === gameId) {
          return { ...game, quantity: game.quantity + 1 }
        }

        return game
      })
    }
    //Encriptamos en las cookies
    let encrypted = AES.encrypt(JSON.stringify(updatedGames), secret).toString()
    localStorage.setItem(ENV.CART, encrypted)
  }

  getAll() {
    // Traemos la informacion encriptada
    const response = localStorage.getItem(ENV.CART)
    // Desencriptamos la informacion
    const bytes = AES.decrypt(response || '[]', secret)
    // Convertimos la informacion a string
    const data = bytes.toString(enc.Utf8)
    // Si no hay informacion, retornamos un array vacio

    if (!data) {
      // Cookie.remove(ENV.CART)
      return []
    } else {
      // Si hay informacion, Parseamos la informacion
      return JSON.parse(data)
    }
  }

  count() {
    const response: ICartItem[] = this.getAll()

    const count = response.reduce(
      (accumulator, game) => accumulator + game.quantity,
      0,
    )
    return count
  }

  increaseQuantity(gameId: number) {
    const games: ICartItem[] = this.getAll()

    const updatedGames = games.map(game => {
      if (game.id === gameId) {
        return { ...game, quantity: game.quantity + 1 }
      }

      return game
    })

    // Cookie.set(ENV.CART, JSON.stringify(updatedGames))
    //Encriptamos en las cookies
    let encrypted = AES.encrypt(JSON.stringify(updatedGames), secret).toString()
    localStorage.setItem(ENV.CART, encrypted)
  }

  decreaseQuantity(gameId: number) {
    const games: ICartItem[] = this.getAll()

    const updatedGames = games.map(game => {
      if (game.id === gameId && game.quantity > 1) {
        return { ...game, quantity: game.quantity - 1 }
      }

      return game
    })

    // Cookie.set(ENV.CART, JSON.stringify(updatedGames))
    //Encriptamos en las cookies
    let encrypted = AES.encrypt(JSON.stringify(updatedGames), secret).toString()
    localStorage.setItem(ENV.CART, encrypted)
  }

  removeItem(gameId: number) {
    const games: ICartItem[] = this.getAll()

    const updatedGames = games.filter(game => game.id !== gameId)

    // Cookie.set(ENV.CART, JSON.stringify(updatedGames))
    //Encriptamos en las cookies o localstorage
    let encrypted = AES.encrypt(JSON.stringify(updatedGames), secret).toString()
    localStorage.setItem(ENV.CART, encrypted)
  }
  deleteAll() {
    localStorage.removeItem(ENV.CART)
  }
  async paymentCart(
    products: ICartItem[],
    user: IUser,
    addressShipping: IAttributesAddress,
  ) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`
      const response = await authFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          products,
          user,
          addressShipping,
        },
      })
      return response
    } catch (error) {
      return error
    }
  }
}
