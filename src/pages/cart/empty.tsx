import React from 'react'
import { BasicLayout } from '../../components/layouts'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import Link from 'next/link'

const EmptyPage = () => {
  return (
    <BasicLayout title="Carrito vacio">
      <div tw="flex items-center [min-height:calc(100vh - 72px)] justify-center">
        <MdOutlineRemoveShoppingCart size={100} tw="text-gray-900" />
        <div>
          <p>Su carrito está vació</p>
          <Link href="/" tw="text-blue-600 text-4xl">
            Regresar
          </Link>
        </div>
      </div>
    </BasicLayout>
  )
}

export default EmptyPage
