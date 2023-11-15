import tw from 'twin.macro'
import { OptimizedImage } from '../../../components/ui'
import { IGames } from '../../../interfaces'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { fn } from '../../../utils'
import { Label } from '../../../components/ui'
import { FaAccusoft } from 'react-icons/fa'

interface Props {
  lastPubDate: IGames
}
export const SBannerLastGamePublished = ({ lastPubDate }: Props) => {
  const wallpaper = lastPubDate.attributes.wallpaper
  const releaseDate = new Date(lastPubDate.attributes.releaseDate).toISOString()
  const price = fn.calcDiscountedPrice(
    lastPubDate.attributes.price,
    lastPubDate.attributes.discount,
  )

  return (
    <section tw="">
      <div tw="relative">
        <OptimizedImage
          stylesImg={tw`h-[650px] mb-20`}
          src={wallpaper.data.attributes.url}
          width={1920}
          height={620}
          alt={lastPubDate.attributes.title}
        />

        <div tw="bg-gray-900 h-[60px] absolute w-full bottom-[-1px] [clip-path: polygon(0 100%,100% 100%, 0 0)]" />
        <Link
          href={lastPubDate.attributes.slug}
          tw="absolute top-[50%] translate-y-[-50%] container flex flex-col gap-3"
        >
          <span tw="text-orange-600 font-bold text-xl">
            {DateTime.fromISO(releaseDate).minus({ days: -0.26 }).toRelative()}
          </span>
          <h1 tw="text-4xl font-bold">{lastPubDate.attributes.title}</h1>
          <div tw="flex gap-5 text-2xl">
            <Label>-{lastPubDate.attributes.discount}%</Label>
            <span>S/. {price}</span>
          </div>
        </Link>
      </div>
    </section>
  )
}
