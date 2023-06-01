import React from 'react'
import { Button, OptimizedImage, WishlistIcon } from '../../../components/ui'
import { FaCheck } from 'react-icons/fa'
import { IoMdPricetags } from 'react-icons/io'
import { IGames } from '../../../interfaces'
import { fn } from '../../../utils'
import { useCart } from '../../../hooks'
import tw from 'twin.macro'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
interface Props {
  gameId: number
  game: IGames
}

export const SPanel = ({ gameId, game }: Props) => {
  const { addCart } = useCart()
  const [loading, setLoading] = useState(false)
  const gameAttributes = game.attributes
  const platform = gameAttributes.platform.data
  const buyPrice = fn.calcDiscountedPrice(
    gameAttributes.price,
    gameAttributes.discount,
  )
  const fecha: any = gameAttributes.releaseDate

  const addCartWrapper = () => {
    setLoading(true)
    addCart(gameId)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  return (
    <section tw="container lg:translate-y-[-40%]">
      <div tw="grid lg:grid-cols-2 gap-5 max-w-[1200px] mx-auto">
        <OptimizedImage
          stylesImg={tw`bg-red-500 rounded-[20px] h-[350px] `}
          src={gameAttributes.cover.data.attributes.url}
          alt={gameAttributes.title}
          width={500}
          height={500}
        />

        <div tw="order-[-1] lg:order-[initial] flex flex-col gap-6 py-7 px-5 [backdrop-filter:blur(16px) ] bg-blue-200/10 rounded-[20px] h-fit relative">
          <div tw="flex flex-col items-center gap-4">
            <h1 tw="text-xl sm:text-2xl lg:text-4xl font-bold text-center">
              {gameAttributes.title}
            </h1>
            {/* Plataforma y stock */}
            <div tw="flex gap-4 items-center py-3 px-6 rounded-full bg-gray-400/20 w-fit">
              <div tw="flex items-center gap-3 ">
                <img
                  tw=" [filter: brightness(0) invert(1)]"
                  src={platform.attributes.icon.data.attributes.url}
                  alt={platform.attributes.title}
                />
                <span>{platform.attributes.title}</span>
              </div>
              <div tw="w-[6px] h-[20px] bg-slate-600" />
              <div tw="flex gap-2 items-center">
                <FaCheck size={16} tw="text-green-500" />
                <span>En stock</span>
              </div>
            </div>
          </div>
          {/* Precios */}

          <div tw="flex gap-4 items-center justify-center">
            {gameAttributes.discount > 0 && (
              <div tw="font-medium flex items-center gap-2">
                <IoMdPricetags size={16} />
                <span tw="[text-decoration: line-through;]">
                  S/. {gameAttributes.price}
                </span>
                <span tw="text-orange-600 font-bold">
                  -{gameAttributes.discount}%
                </span>
              </div>
            )}

            <span tw="text-3xl font-semibold">S/. {buyPrice}</span>
          </div>
          <Button onClick={addCartWrapper}>
            {loading ? (
              <AiOutlineLoading3Quarters size={24} tw="animate-spin mx-auto" />
            ) : (
              'Comprar ahora'
            )}{' '}
          </Button>
          <WishlistIcon
            styleIcon={tw`absolute top-7 right-5`}
            gameId={gameId}
          />
        </div>

        <p>{gameAttributes.summary}</p>
        <ul>
          <li>
            Fecha de lanzamiento:
            <span tw="font-semibold"> {fecha}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
