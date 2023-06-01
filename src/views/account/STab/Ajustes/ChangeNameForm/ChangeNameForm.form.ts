import * as Yup from 'yup'

export const initialValues = (name: string | undefined) => {
  return {
    name,
  }
}

export const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required('Este campo es requerido'),
  })
}
