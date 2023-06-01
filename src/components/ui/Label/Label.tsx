import { FC, PropsWithChildren } from 'react'

export const Label: FC<PropsWithChildren> = ({ children }) => {
  return (
    <span tw="font-bold bg-orange-600 text-white relative rounded-[8px 8px 0] p-[3px 4px 1px 4px] z-10 text-[13px] after:(absolute w-full skew-x-[16deg ] rounded-[10px 5px] top-0 bottom-0 right-[-4px] z-[-1]) after:bg-orange-600 ">
      {children}
    </span>
  )
}
