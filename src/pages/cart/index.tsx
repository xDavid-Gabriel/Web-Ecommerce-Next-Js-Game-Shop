import { useEffect, useState } from 'react'
import { CartLayout } from '../../components/layouts'
import { GetServerSideProps } from 'next'
import { useCart } from '../../hooks'
import { useRouter } from 'next/router'
import { Game } from '../../api'
import { Cart } from '../../views/cart'
import { ICartItem } from '../../interfaces'
import { StepCart } from '../../components/ui'

const gameCtrl = new Game()

const CartPage = () => {
  const router = useRouter()

  const step = router.query.step ?? 1
  const currentStep = Number(step)
  const { isCartLoaded, cart } = useCart()
  const [cartData, setCartData] = useState<ICartItem[]>([])

  useEffect(() => {
    if (
      cart.length === 0 &&
      isCartLoaded &&
      (currentStep === 1 || currentStep === 2)
    ) {
      router.replace('/cart/empty')
    } else {
      const getCart = async () => {
        const cartItem: ICartItem[] = cart || '[]'

        const cartDataPromises = cartItem.map(async cart => {
          try {
            const game = await gameCtrl.getGameById(cart.id.toString())
            return {
              ...cart,
              ...game.data,
            }
          } catch (error) {
            console.error(`Error al obtener el producto`, error)
            return null // Devolver null para indicar que el producto no existe
          }
        })

        const cartData = await Promise.all(cartDataPromises)
        // Filtrar los productos válidos (diferentes de null)
        const validCartData = cartData.filter(item => item !== null)

        setCartData(validCartData)
      }
      getCart()
    }
  }, [cart, isCartLoaded])

  console.log((cart.length === 0 && currentStep === 1) || 2)

  if (cart.length === 0 && (currentStep === 1 || currentStep === 2)) {
    return <></>
  }
  return (
    <>
      <CartLayout>
        <div tw="flex justify-center xl:hidden my-10">
          <StepCart />
        </div>
        {currentStep === 1 && <Cart.SStepOne games={cartData} />}
        {currentStep === 2 && <Cart.SStepTwo games={cartData} />}
        {currentStep === 3 && <Cart.SStepThree />}
      </CartLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { step = 1 } = query
  const { token } = req.cookies

  if (Number(step) === 3 && query.collection_status !== 'approved') {
    return {
      redirect: {
        destination: '/cart?step=1',
        permanent: false,
      },
    }
  }

  if (!token && Number(step) === 2) {
    return {
      redirect: {
        destination: '/join/sign-in',
        permanent: false,
      },
    }
  }

  const lastStep = 3 // Último paso válido
  // Validar si step es mayor que el último paso válido
  if (Number(step) > lastStep || !Number(step)) {
    return {
      // redirect: {
      //   destination: '/cart', // Página de "carrito inicio"
      //   permanent: false,
      // },
      notFound: true,
    }
  }

  // const cartItem = req.cookies.cart || '[]'
  // const cart: ICartItem[] = JSON.parse(cartItem)

  // const cartDataPromises = cart.map(async cart => {
  //   const game = await gameCtrl.getGameById(cart.id.toString())
  //   return {
  //     ...cart,
  //     ...game.data,
  //   }
  // })

  // const cartData = await Promise.all(cartDataPromises)

  return {
    props: {},
  }
}
export default CartPage
