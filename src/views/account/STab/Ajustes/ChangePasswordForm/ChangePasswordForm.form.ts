import * as Yup from 'yup'

export const initialValues = () => {
  return {
    password: '',
    repeatPassword: '',
  }
}

export const validationSchema = () => {
  return Yup.object({
    password: Yup.string().required('Este campo es requerido'),
    repeatPassword: Yup.string()
      .required('Este campo es requerido')
      .oneOf([Yup.ref('password')], 'Tiene que ser la misma contraseña'),
  })
}
