import { useState } from 'react'
import { BasicModal, Button } from '../../../../../components/ui'
import { AddressForm } from '../AddressForm/AddressForm'

interface Props {
  onReload: () => void
}

export const AddAddress = ({ onReload }: Props) => {
  const [show, setShop] = useState(false)

  const onOpenClose = () => setShop(prevState => !prevState)

  return (
    <div tw="justify-end flex">
      <Button onClick={onOpenClose}>Crear</Button>
      <BasicModal show={show} onClose={onOpenClose} title="Nueva Dirección">
        <AddressForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </div>
  )
}
