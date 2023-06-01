import { useRouter } from 'next/router'
import { FaCheck } from 'react-icons/fa'
import tw from 'twin.macro'

export const StepCart = () => {
  const {
    query: { step = 1 },
  } = useRouter()

  const getStepStyles = (currentStep: number, targetStep: number) => {
    const isActiveStep = currentStep === targetStep
    const isCompletedStep = currentStep > targetStep

    if (isActiveStep) {
      return {
        borderStyle: tw`border-orange-600`,
        backgroundStyle: tw`bg-gray-600`,
      }
    } else if (isCompletedStep) {
      return {
        borderStyle: tw`bg-orange-600 border-orange-600`,
        backgroundStyle: tw`bg-orange-600`,
      }
    } else {
      //Por defecto
      return {
        borderStyle: tw`border-gray-600`,
        backgroundStyle: tw`bg-gray-600`,
      }
    }
  }
  return (
    <ul tw="flex flex-col items-start md:items-center gap-7 md:flex-row">
      <li tw="flex gap-3 items-center">
        <span
          tw="w-7 h-7 border-[2px] rounded-full grid place-content-center"
          css={getStepStyles(Number(step), 1).borderStyle}
        >
          {Number(step) > 1 ? <FaCheck size={14} /> : 1}
          {/* {Number(step) === 1 ? 1 : <FaCheck size={14} />} */}
        </span>
        <p>Cesta</p>
        <div
          tw="w-[7rem] h-[1px] "
          css={getStepStyles(Number(step), 1).backgroundStyle}
        />
      </li>
      <li tw="flex gap-3 items-center">
        <span
          tw=" w-7 h-7 border-[2px] rounded-full grid place-content-center"
          css={getStepStyles(Number(step), 2).borderStyle}
        >
          {Number(step) >= 3 ? <FaCheck size={14} /> : 2}
          {/* {Number(step) === 2 || step === 1 ? 2 : <FaCheck size={14} />} */}
        </span>
        <p>Pago</p>
        <div
          tw="w-[7rem] h-[1px]"
          css={getStepStyles(Number(step), 2).backgroundStyle}
        />
      </li>
      <li tw="flex gap-3 items-center">
        <span
          tw="w-7 h-7 border-[2px] rounded-full grid place-content-center"
          css={getStepStyles(Number(step), 3).borderStyle}
        >
          {Number(step) <= 3 ? 3 : <FaCheck size={14} />}
          {/* {Number(step) === 3 ? 3 : 3} */}
        </span>
        <p>Confimación</p>
      </li>
    </ul>
  )
}
