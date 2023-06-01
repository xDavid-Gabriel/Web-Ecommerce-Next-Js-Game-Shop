import { useState, useEffect } from 'react'
import { IAddresses, ICartItem } from '../../../../interfaces'
import { Cart } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { fn } from '../../../../utils'
import { Button } from '../../../../components/ui'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
interface Props {
  games: ICartItem[]
  addressSelected: IAddresses | null
}
const cartCtrl = new Cart()
export const Resume = ({ games, addressSelected }: Props) => {
  const { user } = useAuth()
  const router = useRouter()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      let totalTemp = 0

      games.forEach(game => {
        const price = fn.calcDiscountedPrice(
          game.attributes?.price!,
          game.attributes?.discount!,
        )

        totalTemp += price * game.quantity
      })

      setTotal(Number(totalTemp.toFixed(2)))
    }
    getTotal()
  }, [games])

  const postPayment = async () => {
    if (addressSelected) {
      const response = await cartCtrl.paymentCart(
        games,
        user,
        addressSelected.attributes,
      )

      if (response?.response?.status === 500) {
        await MySwal.fire({
          title: (
            <p tw="font-normal text-xl text-white">
              Acción no permitida: Se ha detectado un intento de manipulación de
              precios ❌.
            </p>
          ),
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'button-confirm',
            popup: 'popup-bg',
          },
        })
        router.reload()
      } else {
        window.location.href = response.init_point
        // deleteAllItems()
      }
    } else {
      await MySwal.fire({
        title: (
          <p tw="font-normal text-xl text-white">
            Por favor, selecciona una dirección de envío 😁.
          </p>
        ),
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'button-confirm',
          popup: 'popup-bg',
        },
      })
    }
  }

  return (
    <div tw="flex flex-col gap-5">
      <h2 tw="font-bold text-2xl">Resume</h2>
      {games.map(game => (
        <div key={game.id} tw="flex justify-between items-center">
          <div>
            <h2 tw="font-medium">{game.attributes?.title}</h2>
            <p tw="text-gray-400">
              {game.attributes?.platform.data.attributes.title}
            </p>
          </div>
          <span tw="text-gray-400 flex gap-2 items-center">
            <p>{game.quantity > 0 && `${game.quantity}x`}</p>
            S/.{' '}
            {fn.calcDiscountedPrice(
              game.attributes?.price!,
              game.attributes?.discount!,
            )}
          </span>
        </div>
      ))}
      <div tw="flex flex-col gap-3 mt-5">
        <div tw="flex justify-between items-center">
          <span tw="font-medium ">Total</span>
          <span tw="text-xl font-medium">S/. {total.toFixed(2)}</span>
        </div>
        {/* {addressSelected && <Button>Pagar</Button>} */}
        <Button onClick={postPayment}>Pagar</Button>
      </div>
    </div>
  )
}
