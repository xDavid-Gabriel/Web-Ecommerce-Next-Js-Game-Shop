import React from 'react'
import { Button } from '../../../../../components/ui'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeNameForm.form'
import tw from 'twin.macro'
import { useAuth } from '../../../../../hooks'
import { User } from '../../../../../api'

const userCtrl = new User()

export const ChangeNameForm = () => {
  const { user, updateUser } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(user.name),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValues => {
      try {
        console.log(formValues)
        await userCtrl.updateMe(Number(user.id), formValues)

        updateUser('name', formValues.name)
      } catch (error) {
        console.log(error)
      }
    },
  })
  return (
    <form tw="px-6" onSubmit={formik.handleSubmit}>
      <label tw="font-semibold">Nombre y apellido</label>
      <div tw="flex gap-5 items-center">
        <div tw="w-full">
          <input
            css={formik.errors.name ? tw`border-red-500` : tw`border-gray-300`}
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Nombre y apellidos"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600 my-4"
            name="name"
            type="text"
          />
          {formik.errors.name && <p tw="text-red-500">{formik.errors.name}</p>}
        </div>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
