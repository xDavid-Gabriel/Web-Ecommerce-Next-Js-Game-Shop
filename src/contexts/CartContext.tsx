import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  FC,
} from 'react'
import { Cart } from '../api'
import { ICartItem } from '../interfaces'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const cartCtrl = new Cart()

interface ContextProps {
  addCart: (gameId: number) => void
  total: number
  cart: ICartItem[]
  isCartLoaded: boolean
  increaseQuantity: (gameId: number) => void
  decreaseQuantity: (gameId: number) => void
  removeItem: (gameId: number) => void
  deleteAllItems: () => void
}

export const CartContext = createContext({} as ContextProps)
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [cart, setCart] = useState<ICartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isCartLoaded, setIsCartLoaded] = useState(false) // Agrega el estado isCartLoaded al contexto
  //const [isMounted, setIsMounted] = useState(false)
  // useEffect(() => {
  //   if (!isMounted) {
  //     const response = cartCtrl.getAll()
  //     setCart(response)
  //     setIsMounted(true)
  //     setTotal(cartCtrl.count()) // Calculamos el valor inicial de total
  //   }
  // }, [isMounted])

  useEffect(() => {
    const response = cartCtrl.getAll()
    setCart(response)
    setTotal(cartCtrl.count()) // Calculamos el valor inicial de total
    setIsCartLoaded(true) // Actualiza el estado isCartLoaded a true al cargar el carrito

    //Esto verificara si un usuario a hecho modificaiones en el localStorage sy es asi se ejecuta esta función
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key === 'cart') {
        await MySwal.fire({
          title: (
            <p tw="font-normal text-xl text-white">
              Se detectó una modificación no autorizada en tu carrito de
              compras. Todos los elementos agregados anteriormente serán
              eliminados. Por favor, vuelve a agregar los productos deseados.
              Disculpa las molestias.
            </p>
          ),
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'button-confirm',
            popup: 'popup-bg',
          },
        })
        localStorage.removeItem('cart')
        router.reload()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const addCart = (gameId: number) => {
    cartCtrl.add(gameId)
    refreshTotalCart()
  }

  const increaseQuantity = (gameId: number) => {
    cartCtrl.increaseQuantity(gameId)
    refreshTotalCart()
  }

  const decreaseQuantity = (gameId: number) => {
    cartCtrl.decreaseQuantity(gameId)
    refreshTotalCart()
  }

  const removeItem = (gameId: number) => {
    cartCtrl.removeItem(gameId)
    refreshTotalCart()
  }

  const deleteAllItems = () => {
    cartCtrl.deleteAll()
    refreshTotalCart()
  }
  const refreshTotalCart = () => {
    setCart(cartCtrl.getAll()) // Actualizamos el estado del carrito lo desemcripta
    setTotal(cartCtrl.count())
  }

  const data = {
    cart,
    addCart,
    isCartLoaded, // Agrega el estado isCartLoaded al contexto
    total,
    removeItem,
    deleteAllItems,
    increaseQuantity,
    decreaseQuantity,
  }

  return (
    <CartContext.Provider value={{ ...data }}>{children}</CartContext.Provider>
  )
}
