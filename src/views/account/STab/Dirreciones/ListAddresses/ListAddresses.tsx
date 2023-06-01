import { useState, useEffect } from 'react'
import { Address as AddressCtrl } from '../../../../../api/address'
import { useAuth } from '../../../../../hooks'
import { IAddresses } from '../../../../../interfaces'

import { Address } from './Address/Address'

const addressCtrl = new AddressCtrl()
interface Props {
  reload: boolean
  onReload: () => void
}
export const ListAddresses = ({ reload, onReload }: Props) => {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<IAddresses[]>([])

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const { data } = await addressCtrl.getAll(Number(user.id))
        setAddresses(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAddresses()
  }, [reload])

  //-1, "a" se va situar en un indice menor a "b"
  // 0, no hay cambios
  // 1, "b" se va situar en un indice menor a "a"
  // el sort siempre tiene que retornar valores positivos o negativcos para que puedan situarse al comparar
  //en la función de comparación que se pasa como parámetro al método sort, se debe retornar un número positivo si el primer elemento es mayor que el segundo, un número negativo si el primer elemento es menor que el segundo, y 0 si ambos elementos son iguales. De esta forma, el método sort puede comparar los elementos del array y ordenarlos correctamente.
  const sortedAddresses = addresses.sort((a, b) => (a.id > b.id ? 1 : -1))
  if (!addresses) return null
  return (
    <div tw="flex flex-col gap-5 my-8">
      {sortedAddresses.map(address => (
        <Address
          key={address.id}
          addressId={address.id}
          address={address}
          onReload={onReload}
        />
      ))}
    </div>
  )
}
