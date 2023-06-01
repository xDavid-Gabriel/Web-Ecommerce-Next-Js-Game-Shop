import tw from 'twin.macro'
import { OptimizedImage } from '../../../../components/ui'
import { ICartItem } from '../../../../interfaces'
import { fn } from '../../../../utils'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { useCart } from '../../../../hooks'

interface Props {
  games: ICartItem[]
}
export const Cesta = ({ games }: Props) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart()

  return (
    <div>
      <h2 tw="font-bold text-2xl mb-7">Cesta</h2>
      <div tw="flex flex-col gap-8">
        {games.map(game => (
          <div
            key={game.id}
            tw="grid  sm:[grid-template-columns: 1fr 1fr max-content] gap-6"
          >
            <Link href={game.attributes?.slug!}>
              <OptimizedImage
                stylesImg={tw`rounded-[20px]`}
                src={game.attributes?.cover.data.attributes.url!}
                alt={game.attributes?.title!}
                width={500}
                height={500}
              />
            </Link>
            <div tw="flex items-center text-center gap-2 flex-col justify-between sm:items-start sm:text-start sm:gap-0">
              <div>
                <h3 tw="text-[1.1rem] font-bold">{game.attributes?.title}</h3>
                <p tw="text-gray-400">
                  {game.attributes?.platform.data.attributes.title}
                </p>
              </div>
              <button
                tw="hover:text-red-600 transition duration-300"
                onClick={() => removeItem(game.id)}
              >
                <FaTrash size={15} />
              </button>
            </div>
            {/* Cantidad */}
            <div tw="flex items-center gap-5 justify-center sm:justify-start">
              <div tw="flex items-center gap-3">
                <button
                  tw="bg-orange-600 rounded-[7px] w-8 h-8 grid place-content-center"
                  onClick={() => decreaseQuantity(game.id)}
                >
                  <FaMinus size={13} />
                </button>
                <span tw="font-medium">{game.quantity}</span>
                <button
                  tw="bg-orange-600 rounded-[7px] w-8 h-8 grid place-content-center"
                  onClick={() => increaseQuantity(game.id)}
                >
                  <FaPlus size={13} />
                </button>
              </div>
              {/* Precio */}
              <span tw="font-medium">
                S/.{' '}
                {fn.calcDiscountedPrice(
                  game.attributes?.price!,
                  game.attributes?.discount!,
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
