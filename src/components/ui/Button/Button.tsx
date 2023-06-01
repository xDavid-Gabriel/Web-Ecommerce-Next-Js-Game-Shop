import tw, { styled } from 'twin.macro'
interface btnProps {
  variant?: 'primary' | 'cancel'
}
export const Button = styled.button.attrs({ className: '' })(
  ({ variant = 'primary' }: btnProps) => [
    tw`transition duration-300 border-[2px] border-transparent font-medium inline-block py-2.5 px-7`,
    variant === 'primary' &&
      tw` !bg-orange-600 rounded-[10px] text-white hover:!bg-orange-500`,

    variant === 'cancel' &&
      tw`rounded-[10px] bg-gray-300 text-black hover:bg-gray-400`,
  ],
)
