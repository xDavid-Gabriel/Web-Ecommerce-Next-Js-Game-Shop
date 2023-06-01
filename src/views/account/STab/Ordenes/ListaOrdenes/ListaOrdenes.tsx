import { useState, useEffect } from 'react'
import { Order } from '../../../../../api'
import { useAuth } from '../../../../../hooks'
import { Orden } from './Orden/Orden'
import { IOrder } from '../../../../../interfaces'

const orderCtrl = new Order()
export const ListaOrdenes = () => {
  const [orders, serOrders] = useState<IOrder[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await orderCtrl.getAll(user.id!)
      serOrders(data)
    }
    getOrders()
  }, [user.id])

  if (orders.length === 0)
    return (
      <p tw="text-gray-400 text-center py-10">
        No tienes ningun producto comprado 😪
      </p>
    )

  return (
    <div tw="flex flex-col gap-5">
      {orders.map(order => (
        <Orden order={order} key={order.id} />
      ))}
    </div>
  )
}
