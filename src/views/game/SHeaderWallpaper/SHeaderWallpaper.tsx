import React from 'react'
import { OptimizedImage } from '../../../components/ui'
import tw from 'twin.macro'

interface Props {
  image: string
  titleAlt: string
}

export const SHeaderWallpaper = ({ image, titleAlt }: Props) => {
  return (
    <section>
      <div tw="relative">
        <OptimizedImage
          src={image}
          alt={titleAlt}
          stylesImg={tw`h-[400px] lg:h-auto`}
          width={1920}
          height={620}
        />
        <div tw="bg-gray-900 h-[60px] absolute w-full bottom-[-1px] [clip-path: polygon(0 100%,100% 100%, 0 0)]" />
      </div>
    </section>
  )
}
