import { DateTime } from 'luxon'
import { BasicModal, OptimizedImage } from '../../../../../../components/ui'
import { useState } from 'react'
import { IOrder } from '../../../../../../interfaces'
import tw from 'twin.macro'
interface Props {
  order: IOrder
}
export const Orden = ({ order }: Props) => {
  const [show, setShow] = useState(false)
  const createdAt = new Date(order.attributes.createdAt).toISOString()
  const products = order.attributes.products
  const address = order.attributes.addressShipping
  const onOpenCloseModal = () => setShow(prevState => !prevState)

  const getTotalProducts = () => {
    let total = 0

    products.forEach(product => {
      total += Number(product.quantity)
    })

    return total
  }

  return (
    <>
      <div
        tw="bg-gray-600 cursor-pointer flex flex-col items-center gap-6 justify-between transition duration-300 border-[2px] border-transparent hover:border-orange-600 p-5 rounded-[10px] sm:gap-0 sm:flex-row"
        onClick={onOpenCloseModal}
      >
        <div>
          <span tw="text-gray-400 text-sm">
            {DateTime.fromISO(createdAt, { locale: 'es' }).toFormat(
              'dd/MM/yyyy',
            )}
          </span>
          <p>{getTotalProducts()} productos</p>
        </div>
        <p tw="text-xl font-bold">
          S/. {order.attributes.totalPayment.toFixed(2)}
        </p>
      </div>

      <BasicModal
        show={show}
        onClose={onOpenCloseModal}
        title="Información del pedido"
        styleBasicModal={tw`max-w-[400px] h-[600px] sm:max-w-[780px] sm:h-[442.5px] overflow-auto scroll-m-0`}
        // h-[lo que calcule] + 160px
      >
        <div tw="mt-5">
          {products.map(product => {
            const precio = +product.unit_price
            return (
              <div
                key={product.id}
                tw="grid py-5 sm:[grid-template-columns:8rem 1fr 1fr] items-center gap-5 border-b-[1px] border-gray-400"
              >
                <OptimizedImage
                  src={product.picture_url}
                  alt={product.title}
                  width={200}
                  height={200}
                  stylesImg={tw`rounded-[20px]`}
                />
                <div>
                  <p tw="font-medium">{product.title}</p>
                  <span tw="text-gray-400">{product.description}</span>
                </div>
                <div tw="flex items-center gap-2 justify-self-end font-medium">
                  <span>x{product.quantity}</span>
                  <span>S/. {precio.toFixed(2)}</span>
                </div>
              </div>
            )
          })}
          <div tw="flex flex-col gap-1 bg-slate-900 p-5 rounded-[20px] mt-5">
            <span tw="font-medium text-xl">{address.title}</span>
            <p tw="text-gray-400">
              {address.name}, {address.address}, {address.state}, {address.city}
              , {address.postal_code}
            </p>
          </div>
          <p tw="font-bold text-2xl mt-5 flex justify-end text-orange-600">
            {' '}
            Total S./ {order.attributes.totalPayment.toFixed(2)}
          </p>
        </div>
      </BasicModal>
    </>
  )
}
