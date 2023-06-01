import React from 'react'
import { ICartItem } from '../../../../interfaces'
import { useState, useEffect } from 'react'
import { fn } from '../../../../utils'
import { useRouter } from 'next/router'
import { Button } from '../../../../components/ui'
import Link from 'next/link'
import { useAuth } from '../../../../hooks'

interface Props {
  games: ICartItem[]
}
interface Total {
  original: number
  discount: number
  price: number
}
export const Resume = ({ games }: Props) => {
  const { user } = useAuth()
  const router = useRouter()
  const [total, setTotal] = useState<Total>({
    original: 0,
    discount: 0,
    price: 0,
  })
  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    }
    games.forEach(game => {
      const price = fn.calcDiscountedPrice(
        game.attributes?.price!,
        game.attributes?.discount!,
      )
      totals = {
        original: totals.original + game.attributes?.price! * game.quantity,
        discount:
          totals.discount + (game.attributes?.price! - price) * game.quantity,
        price: totals.price + price * game.quantity,
      }
    })

    setTotal(totals)
  }, [games])

  const goToStepTwo = () => {
    if (user.name === '') {
      router.push('/join/sign-in')
    } else {
      router.replace({ query: { ...router.query, step: 2 } })
    }
  }
  if (!total) return null
  return (
    <div>
      <div tw="sticky top-0">
        <h2 tw="font-bold text-2xl mb-7">Resume</h2>
        <div tw="flex flex-col gap-5">
          <ul>
            <li tw="text-gray-400 flex justify-between">
              Precio oficial{' '}
              <span tw="font-medium">S/. {total.original.toFixed(2)}</span>
            </li>
            <li tw="text-gray-400 flex justify-between">
              Descuento{' '}
              <span tw="font-medium">S/. {total.discount.toFixed(2)}</span>
            </li>
            <li tw="font-medium flex justify-between mt-2">
              Subtotal <span>S/. {total.price.toFixed(2)}</span>
            </li>
          </ul>

          <Button onClick={goToStepTwo}>Proceder con el pago</Button>

          <Link href="/" tw="text-gray-400 text-center">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
