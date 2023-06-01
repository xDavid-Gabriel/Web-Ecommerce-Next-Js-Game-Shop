import * as Yup from 'yup'

export const initialValues = () => {
  return {
    identifier: '',
    password: '',
  }
}

export const validationSchema = () => {
  return Yup.object({
    identifier: Yup.string().required('Su nombre usuario o email es requerido'),
    password: Yup.string().required('Su contraseña es requerida'),
  })
}
