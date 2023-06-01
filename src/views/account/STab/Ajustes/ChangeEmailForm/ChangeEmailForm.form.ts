import * as Yup from 'yup'

export const initialValues = () => {
  return {
    email: '',
    repeatEmail: '',
  }
}

export const validationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email('Ingrese un correo valido')
      .required('Este campo es requerido'),
    repeatEmail: Yup.string()
      .email('Ingrese un correo valido')
      .required('Este campo es requerido')
      .oneOf([Yup.ref('email')], 'Tiene que ser el mismo correo'),
  })
}
