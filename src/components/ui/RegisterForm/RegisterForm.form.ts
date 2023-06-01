import * as Yup from 'yup'

export const initialValues = () => {
  return {
    email: '',
    username: '',
    name: '',
    password: '',
  }
}

export const validationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email('Ingrese un correo valido')
      .required('Su correo es requerido'),
    username: Yup.string().required('Su nombre de usuario es requerido'),
    name: Yup.string().required('Su nombre es requerido'),
    password: Yup.string().required('Su contraseña es requerida'),
  })
}
