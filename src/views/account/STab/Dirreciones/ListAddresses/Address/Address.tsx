import { useState } from 'react'
import { BasicModal, Button } from '../../../../../../components/ui'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { AddressForm } from '../../AddressForm/AddressForm'
import { IAddresses } from '../../../../../../interfaces'
import tw from 'twin.macro'
import { Address as AddressCtrl } from '../../../../../../api'
interface Props {
  address: IAddresses
  onReload: () => void
  addressId: number
}
const addressCtrl = new AddressCtrl()
export const Address = ({ address, onReload, addressId }: Props) => {
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const onOpenCloseEdit = () => setShowEdit(prevState => !prevState)
  const onOpenCloseConfirm = () => setShowConfirm(prevState => !prevState)

  const onDelete = async () => {
    try {
      await addressCtrl.delete(addressId)
      onReload()
      onOpenCloseConfirm()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div tw="bg-gray-600 flex flex-col items-center gap-6 justify-between p-5 rounded-[10px] sm:gap-0 sm:flex-row">
      <div tw="flex flex-col text-center gap-3 items-center sm:flex-row sm:text-start">
        <strong tw="[letter-spacing:1px]">{address.attributes.title}: </strong>
        <p tw="text-white/60">
          {address.attributes.address}, {address.attributes.state},{' '}
          {address.attributes.city}, {address.attributes.postal_code},{' '}
          {address.attributes.phone}
        </p>
      </div>

      <div tw="flex gap-3">
        <Button onClick={onOpenCloseEdit}>
          <FaPencilAlt size={15} />
        </Button>
        <Button onClick={onOpenCloseConfirm}>
          <FaTrash size={15} />
        </Button>
      </div>
      {/* //Modal de confirmación si se eliminara una dirreción */}
      <BasicModal
        show={showConfirm}
        onClose={onOpenCloseConfirm}
        styleBasicModal={tw`max-w-[400px]`}
      >
        <div tw="flex flex-col gap-4 items-center text-center">
          <p>¿Estas seguro de que quieres eliminar la dirección?</p>
          <div tw="flex gap-4">
            <Button variant="cancel" onClick={onOpenCloseConfirm}>
              cancelar
            </Button>
            <Button onClick={onDelete}>Ok</Button>
          </div>
        </div>
      </BasicModal>

      <BasicModal
        show={showEdit}
        onClose={onOpenCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          onClose={onOpenCloseEdit}
          onReload={onReload}
          addressId={addressId}
          address={address}
        />
      </BasicModal>
    </div>
  )
}
