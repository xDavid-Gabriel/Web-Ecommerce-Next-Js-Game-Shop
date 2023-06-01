import { useState, useEffect } from 'react'
import { Address } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { IAddresses } from '../../../../interfaces'
import tw from 'twin.macro'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Direcciones } from '../../../account/STab/Dirreciones'
const MySwal = withReactContent(Swal)

const addressCtrl = new Address()
interface Props {
  addressSelected: IAddresses | null
  setAddressSelected: (value: IAddresses | null) => void
}
export const Addresses = ({ addressSelected, setAddressSelected }: Props) => {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<IAddresses[]>([])
  const [reload, setReload] = useState(false)
  const onReload = () => setReload(prevState => !prevState)

  const addressSelecionado = async (address: IAddresses) => {
    setAddressSelected(address)
    await MySwal.fire({
      title: (
        <p tw="font-normal text-xl text-white">Dirección seleccionada 😁</p>
      ),
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'button-confirm',
        popup: 'popup-bg',
      },
    })
  }
  useEffect(() => {
    const getAddresses = async () => {
      try {
        const { data } = await addressCtrl.getAll(user.id!)
        setAddresses(data)
      } catch (error) {
        console.error('Error al obtener las direcciones:', error)
      }
    }
    getAddresses()
  }, [reload, addresses.length, user.id])

  return (
    <div tw="flex flex-col gap-5">
      <h2 tw="font-bold text-2xl">Dirección</h2>
      {addressSelected ? (
        <p tw="text-gray-400">Dirección seleccionada 🤗</p>
      ) : (
        <p tw="text-gray-400">Seleccione una dirección 🤗</p>
      )}

      {addresses.length === 0 ? (
        <>
          <p tw="text-gray-400">
            ¡Ups! Parece que no tienes ninguna dirección guardada. Por favor,
            crea una nueva dirección para continuar...
          </p>
          <Direcciones.AddAddress onReload={onReload} />
        </>
      ) : (
        <>
          {addresses.map(address => (
            <div
              key={address.id}
              tw="p-5 rounded-[25px] border-[2px] border-gray-400 hover:border-orange-600 cursor-pointer transition duration-300"
              css={
                addressSelected?.id === address.id ? tw`border-orange-600` : ''
              }
              onClick={() => addressSelecionado(address)}
            >
              <p tw="font-medium">
                {address.attributes.name} ({address.attributes.title})
              </p>
              <p tw="text-gray-400">
                {address.attributes.address}, {address.attributes.postal_code},{' '}
                {address.attributes.state},{address.attributes.city}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
