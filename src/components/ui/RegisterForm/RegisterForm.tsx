import Link from 'next/link'
import { useFormik } from 'formik'
import { Auth } from '../../../api'
import { useRouter } from 'next/router'
import { initialValues, validationSchema } from './RegisterForm.form'
import tw from 'twin.macro'
import { useState } from 'react'

const authCtrl = new Auth()

export const RegisterForm = () => {
  const routes = useRouter()

  const [notification, setNotification] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async values => {
      try {
        await authCtrl.register(values)
        routes.push('/')
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
    <>
      {notification && (
        <div tw="bg-red-600 p-4 mb-4 text-center rounded-[10px]">
          El correo electrónico o el nombre de usuario ya están en uso 😰
        </div>
      )}

      <form tw="grid gap-5 sm:grid-cols-2" onSubmit={formik.handleSubmit}>
        <div>
          <input
            css={formik.errors.email ? tw`border-red-500` : tw`border-gray-300`}
            placeholder="Correo electronico"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
          />
          {formik.errors.email && (
            <p tw="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            css={
              formik.errors.username ? tw`border-red-500` : tw`border-gray-300`
            }
            placeholder="Nombre de usuario"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
            <p tw="text-red-500">{formik.errors.username}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            css={formik.errors.name ? tw`border-red-500` : tw`border-gray-300`}
            placeholder="Nombre y apellido"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <p tw="text-red-500">{formik.errors.name}</p>}
        </div>
        <div>
          <input
            type="password"
            css={
              formik.errors.password ? tw`border-red-500` : tw`border-gray-300`
            }
            placeholder="Contraseña"
            tw="border-[2px]  bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p tw="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div tw="flex flex-col gap-4 sm:col-span-2">
          <button
            type="submit"
            tw="!bg-orange-600 hover:!bg-orange-500 text-white p-3 rounded-[10px] font-semibold"
          >
            Registrarse
          </button>
          <Link
            tw="border-[2px] border-orange-600 text-orange-600 text-center p-3 rounded-[10px] font-semibold"
            href="/join/sign-in"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  )
}
