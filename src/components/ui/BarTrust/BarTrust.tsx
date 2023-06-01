import React from 'react'
import { data } from './attributes'
import tw from 'twin.macro'

export const BarTrust = () => {
  return (
    <div tw="bg-gray-700 flex flex-wrap items-center  gap-12 justify-center py-20 my-20">
      {data.map(info => (
        <div
          tw="flex gap-5  items-center"
          key={info.id}
          css={
            info.id === 2
              ? tw`lg:border-l-[2px] lg:border-r-[2px] lg:px-8 lg:border-white`
              : ''
          }
        >
          {<info.icon size={40} color="#EA580C" />}
          <div>
            <strong tw="text-xl">{info.title}</strong>
            <p>{info.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
