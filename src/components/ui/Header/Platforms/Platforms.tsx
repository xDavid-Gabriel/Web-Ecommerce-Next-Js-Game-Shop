import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Search } from '../../Search/Search'
import { IPlatforms } from '../../../../interfaces'
import tw from 'twin.macro'

interface Props {
  isOpenSearch?: boolean
  platforms: IPlatforms[]
}
export const Platforms = ({ platforms, isOpenSearch }: Props) => {
  const router = useRouter()
  console.log(router.asPath)

  return (
    <div tw="relative gap-7 items-center [backdrop-filter: blur(20px)] bg-gray-600/30 pl-8 rounded-full flex">
      {platforms.map(platform => (
        <Link
          href={`/games/${platform.attributes.slug}`}
          key={platform.id}
          tw="flex gap-4 items-center hover:text-orange-600 transition duration-300"
          css={
            router.asPath.includes(`${platform.attributes.slug}`)
              ? tw`text-orange-600`
              : ''
          }
        >
          <Image
            tw="flex-none w-6 h-6 [filter: brightness(0) invert(1)] object-contain"
            width={25}
            height={25}
            src={platform.attributes.icon.data.attributes.url}
            alt={platform.attributes.title}
          />
          {platform.attributes.title}
        </Link>
      ))}

      <Search isOpenSearch={isOpenSearch} />
    </div>
  )
}
