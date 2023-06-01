import { FC } from 'react'
import { Button } from '../../../../../components/ui'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './AddressForm.form'
import tw from 'twin.macro'
import { Address } from '../../../../../api/address'
import { useAuth } from '../../../../../hooks'
import { IAddresses } from '../../../../../interfaces'

interface Props {
  onClose: () => void
  onReload: () => void
  addressId?: number
  address?: IAddresses
}
const addressCtrl = new Address()

export const AddressForm: FC<Props> = ({
  onClose,
  onReload,
  addressId,
  address,
}) => {
  const { user } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(address as IAddresses),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async values => {
      try {
        //Si quiero actualizar una direccion
        if (addressId) {
          await addressCtrl.update(values, addressId)
        } else {
          //Si quiero crear una direccion
          await addressCtrl.create(values, Number(user.id))
        }
        formik.handleReset({ target: { value: '' } })
        onReload()
        onClose()
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <form tw="grid gap-5 mt-5" onSubmit={formik.handleSubmit}>
      <div>
        <input
          css={formik.errors.title ? tw`border-red-500` : tw`border-gray-300`}
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Titulo de la dirrección"
          tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
          name="title"
          type="text"
        />
        {formik.errors.title && <p tw="text-red-500">{formik.errors.title}</p>}
      </div>
      <div tw="flex flex-col gap-4 sm:flex-row">
        <div tw="w-full">
          <input
            css={formik.errors.name ? tw`border-red-500` : tw`border-gray-300`}
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Nombres y apellidos"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
            name="name"
            type="text"
          />
          {formik.errors.name && <p tw="text-red-500">{formik.errors.name}</p>}
        </div>
        <div tw="w-full">
          <input
            css={
              formik.errors.address ? tw`border-red-500` : tw`border-gray-300`
            }
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Dirección"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
            name="address"
            type="text"
          />
          {formik.errors.address && (
            <p tw="text-red-500">{formik.errors.address}</p>
          )}
        </div>
      </div>
      <div tw="flex flex-col gap-4 sm:flex-row">
        <div tw="w-full">
          <input
            css={formik.errors.state ? tw`border-red-500` : tw`border-gray-300`}
            value={formik.values.state}
            onChange={formik.handleChange}
            placeholder="Provincia"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
            name="state"
            type="text"
          />
          {formik.errors.state && (
            <p tw="text-red-500">{formik.errors.state}</p>
          )}
        </div>
        <div tw="w-full">
          <input
            css={formik.errors.city ? tw`border-red-500` : tw`border-gray-300`}
            value={formik.values.city}
            onChange={formik.handleChange}
            placeholder="Ciudad"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
            name="city"
            type="text"
          />
          {formik.errors.city && <p tw="text-red-500">{formik.errors.city}</p>}
        </div>
      </div>
      <div tw="flex flex-col gap-4 sm:flex-row">
        <div tw="w-full">
          <input
            css={
              formik.errors.postal_code
                ? tw`border-red-500`
                : tw`border-gray-300`
            }
            value={formik.values.postal_code}
            onChange={formik.handleChange}
            placeholder="Codigo Postal"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
            name="postal_code"
            type="text"
          />
          {formik.errors.postal_code && (
            <p tw="text-red-500">{formik.errors.state}</p>
          )}
        </div>
        <div tw="w-full">
          <input
            css={formik.errors.phone ? tw`border-red-500` : tw`border-gray-300`}
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Telefono"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 "
            name="phone"
            type="text"
          />
          {formik.errors.phone && (
            <p tw="text-red-500">{formik.errors.phone}</p>
          )}
        </div>
      </div>
      <Button type="submit"> Enviar</Button>
    </form>
  )
}
