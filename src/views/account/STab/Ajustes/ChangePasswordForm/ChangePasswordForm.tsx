import { useState } from 'react'
import { Button } from '../../../../../components/ui'
import { useFormik } from 'formik'
import { User } from '../../../../../api'
import { initialValues, validationSchema } from './ChangePasswordForm.form'
import tw from 'twin.macro'
import { useAuth } from '../../../../../hooks'
import { useRouter } from 'next/router'

const userCtrl = new User()

export const ChangePasswordForm = () => {
  const router = useRouter()
  const { user, logout } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValues => {
      try {
        await userCtrl.updateMe(Number(user.id), {
          password: formValues.password,
        })
        formik.handleReset({ target: { value: '' } })
        logout()
        router.push('/join/sign-in')
      } catch (error) {
        console.log(error)
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <label tw="font-semibold">Cambiar contraseña</label>

      <div tw="w-full">
        <input
          css={
            formik.errors.password ? tw`border-red-500` : tw`border-gray-300`
          }
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Nueva contraseña"
          tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 my-4"
          name="password"
          type="text"
        />
        {formik.errors.password && (
          <p tw="text-red-500">{formik.errors.password}</p>
        )}
      </div>
      <div tw="w-full">
        <input
          css={
            formik.errors.repeatPassword
              ? tw`border-red-500`
              : tw`border-gray-300`
          }
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          placeholder="Repetir contraseña"
          tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 my-4"
          name="repeatPassword"
          type="password"
        />
        {formik.errors.repeatPassword && (
          <p tw="text-red-500">{formik.errors.repeatPassword}</p>
        )}
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  )
}
