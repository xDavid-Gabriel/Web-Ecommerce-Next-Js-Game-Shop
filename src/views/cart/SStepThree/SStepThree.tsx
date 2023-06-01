import { useRouter } from 'next/router'
import { useCart } from '../../../hooks'
import { useEffect } from 'react'
import { FaCheck, FaCheckCircle } from 'react-icons/fa'
import { Button } from '../../../components/ui'
import Link from 'next/link'

export const SStepThree = () => {
  const { deleteAllItems } = useCart()

  useEffect(() => {
    deleteAllItems()
  }, [])
  return (
    <section tw="container flex flex-col gap-7 items-center py-10 lg:py-20">
      <FaCheckCircle tw="text-green-500" size={50} />
      <h1 tw="font-bold text-2xl md:text-4xl">¡Compra exitosa!</h1>
      <Link href="/account">
        <Button>Ver pedido</Button>
      </Link>
    </section>
  )
}
