import React from 'react'
import { Button } from '../Button/Button'
import tw from 'twin.macro'
import { OptimizedImage } from '../OptimizedImg/OptimizedImg'
import Link from 'next/link'

interface Props {
  title: string
  subTitle: string
  btnTitle: string
  btnLink: string
  image: string
}
export const BannerAd = ({
  title,
  subTitle,
  btnTitle,
  btnLink,
  image,
}: Props) => {
  return (
    <div
      tw=" relative h-[500px] bg-[#489bca] [background-image: radial-gradient(circle at center bottom,#489bca 0, #154483 29%, #0f0f1b 73%)] after:(bg-gray-900 bottom-[-1px]  w-full [clip-path:polygon(0 100%, 100% 100%, 0 0)]) after:absolute 
    after:h-[60px] overflow-hidden my-10 sm:my-20 xl:my-32"
    >
      <div tw="container grid lg:grid-cols-2 items-center">
        <div tw="flex flex-col gap-8 pt-8 lg:pt-0">
          <div tw="flex flex-col gap-3">
            <h2 tw="font-bold text-xl sm:text-3xl">{title}</h2>
            <p tw="font-bold ">{subTitle}</p>
          </div>
          <Button css={tw`w-fit`}>
            <Link href={btnLink}>{btnTitle}</Link>
          </Button>
        </div>
        <OptimizedImage
          src={image}
          alt={title}
          width={500}
          height={500}
          stylesImg={tw`max-w-[500px] justify-self-end pt-8`}
        />
      </div>
    </div>
  )
}
