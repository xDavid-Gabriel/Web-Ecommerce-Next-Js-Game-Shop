import Link from 'next/link'
import { fn } from '../../../utils'
import { Label, OptimizedImage, WishlistIcon } from '../'
import { IGames } from '../../../interfaces'
import tw from 'twin.macro'
interface Props {
  games: IGames[]
  wishlistIcon?: boolean
  onReload?: () => void
}

export const GridGames = ({ games, wishlistIcon, onReload }: Props) => {
  return (
    <div tw="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
      {games.map(game => (
        <div key={game.id} tw="relative">
          <Link href={`/${game.attributes.slug}`}>
            <div tw="rounded-[16px] overflow-hidden  relative  after:(absolute w-full h-full top-0 bg-gray-900/25 transition duration-[500ms] opacity-0 hover:opacity-100)">
              <OptimizedImage
                src={game.attributes.cover.data.attributes.url}
                alt={game.attributes.title}
                width={500}
                height={500}
              />
              {game.attributes.discount > 0 && (
                <div tw="absolute bottom-0 left-0 z-[1]">
                  <Label>{`-${game.attributes.discount}%`}</Label>
                </div>
              )}
            </div>
            <div tw="flex justify-between py-4 font-semibold">
              <span> {game.attributes.title}</span>
              <span tw="text-xl">
                S/.{' '}
                {fn.calcDiscountedPrice(
                  game.attributes.price,
                  game.attributes.discount,
                )}
              </span>
            </div>
          </Link>
          {wishlistIcon && (
            <WishlistIcon
              gameId={game.id}
              styleIcon={tw`absolute top-2 right-5  z-10`}
              removeCallback={onReload}
            />
          )}
        </div>
      ))}
    </div>
  )
}
