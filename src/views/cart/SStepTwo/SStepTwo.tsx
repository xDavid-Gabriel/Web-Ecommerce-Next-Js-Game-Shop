import { IAddresses, ICartItem } from '../../../interfaces'
import { Addresses } from './Addresses/Addresses'
import { useState } from 'react'
import { Resume } from './Resume/Resume'

interface Props {
  games: ICartItem[]
}

export const SStepTwo = ({ games }: Props) => {
  const [addressSelected, setAddressSelected] = useState<IAddresses | null>(
    null,
  )

  return (
    <section tw="container grid md:grid-cols-2 gap-20">
      <div tw="flex flex-col gap-5">
        {/* Addres */}
        <Addresses
          addressSelected={addressSelected}
          setAddressSelected={setAddressSelected}
        />
        {/* Payment */}
        {/* Solo entrara a mercadopago */}
        {/* {addressSelected && <div>Payment</div>} */}
      </div>

      {/* Resume */}
      <div>
        <Resume games={games} addressSelected={addressSelected} />
      </div>
    </section>
  )
}
