import { useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { Auth } from '../../../api'
import { useRouter } from 'next/router'
import { initialValues, validationSchema } from './LoginForm.form'
import tw from 'twin.macro'
import { useAuth } from '../../../hooks'

const authCtrl = new Auth()

export const LoginForm = () => {
  const routes = useRouter()

  const [notification, setNotification] = useState(false)
  const { login } = useAuth()
  console.log(useAuth())

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async values => {
      try {
        const { data } = await authCtrl.login(values)
        login(data.jwt)
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
          El identificador o la contraseña no son válidos 😰
        </div>
      )}

      <form tw="grid gap-5 " onSubmit={formik.handleSubmit}>
        <div>
          <input
            css={
              formik.errors.identifier
                ? tw`border-red-500`
                : tw`border-gray-300`
            }
            placeholder="Correo electronico o nombre de usuario"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600"
            type="text"
            name="identifier"
            value={formik.values.identifier}
            onChange={formik.handleChange}
          />
          {formik.errors.identifier && (
            <p tw="text-red-500">{formik.errors.identifier}</p>
          )}
        </div>
        <div>
          <input
            css={
              formik.errors.password ? tw`border-red-500` : tw`border-gray-300`
            }
            placeholder="Contraseña"
            tw="border-[2px] bg-gray-800 w-full block placeholder:text-white p-2.5 rounded-[10px] outline-none focus:border-orange-600"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p tw="text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div tw="flex flex-col gap-4 ">
          <button
            type="submit"
            tw="!bg-orange-600 hover:!bg-orange-500 text-white p-3 rounded-[10px] font-semibold"
          >
            Entrar
          </button>
          <Link tw="text-white font-semibold" href="/join/sign-up">
            ¿No tienes una cuenta?
          </Link>
        </div>
      </form>
    </>
  )
}
