import { useState } from 'react'
import { Button } from '../../../../../components/ui'
import { useFormik } from 'formik'
import { User } from '../../../../../api'
import { initialValues, validationSchema } from './ChangeEmailForm.form'
import tw from 'twin.macro'
import { useAuth } from '../../../../../hooks'

const userCtrl = new User()

export const ChangeEmailForm = () => {
  const { user, updateUser } = useAuth()
  const [notification, setNotification] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValues => {
      try {
        await userCtrl.updateMe(Number(user.id), { email: formValues.email })
        formik.handleReset({ target: { value: '' } })
        updateUser('email', formValues.email)
      } catch (error) {
        if (error) {
          setNotification(true)
          setTimeout(() => {
            setNotification(false)
          }, 3000)
        }
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <label tw="font-semibold">Cambiar correo electronico</label>
      {notification && (
        <div tw="bg-red-600 p-4 mb-4 text-center rounded-[10px]">
          Ese correo ya existe utiliza otro 😥
        </div>
      )}
      <div tw="w-full">
        <input
          css={formik.errors.email ? tw`border-red-500` : tw`border-gray-300`}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Nuevo correo electronico"
          tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 my-4"
          name="email"
          type="text"
        />
        {formik.errors.email && <p tw="text-red-500">{formik.errors.email}</p>}
      </div>
      <div tw="w-full">
        <input
          css={
            formik.errors.repeatEmail ? tw`border-red-500` : tw`border-gray-300`
          }
          value={formik.values.repeatEmail}
          onChange={formik.handleChange}
          placeholder="Repetir correo electronico"
          tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 my-4"
          name="repeatEmail"
          type="text"
        />
        {formik.errors.repeatEmail && (
          <p tw="text-red-500">{formik.errors.repeatEmail}</p>
        )}
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  )
}
