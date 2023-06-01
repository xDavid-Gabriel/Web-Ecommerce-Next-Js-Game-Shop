import * as Yup from 'yup'
import { IAddresses } from '../../../../../interfaces'

export const initialValues = (address: IAddresses) => {
  return {
    title: !address ? '' : address.attributes.title,
    name: !address ? '' : address.attributes.name,
    address: !address ? '' : address.attributes.address,
    city: !address ? '' : address.attributes.city,
    state: !address ? '' : address.attributes.state,
    postal_code: !address ? '' : address.attributes.postal_code,
    phone: !address ? '' : address.attributes.phone,
  }
}

export const validationSchema = () => {
  return Yup.object({
    title: Yup.string().required('Este campo es requerido'),
    name: Yup.string().required('Este campo es requerido'),
    address: Yup.string().required('Este campo es requerido'),
    city: Yup.string().required('Este campo es requerido'),
    state: Yup.string().required('Este campo es requerido'),
    postal_code: Yup.string().required('Este campo es requerido'),
    phone: Yup.string().required('Este campo es requerido'),
  })
}
