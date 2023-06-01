import { FC, PropsWithChildren, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaLock,
} from 'react-icons/fa'

import { StepCart } from '../../ui'
import Head from 'next/head'
interface Props {
  title?: string
}
export const CartLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title = 'Mi carrito',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* seo && Schemas */}

        <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
      </Head>
      <header tw="container justify-between flex py-4 items-center">
        <Link href="/">
          <Image
            width={150}
            tw="w-[100px] lg:w-[150px]"
            height={150}
            src="/img/logo.png"
            alt="logo"
          />
        </Link>
        {/* Pasos */}
        <div tw="hidden xl:block">
          <StepCart />
        </div>
        <div tw="flex items-center gap-3">
          <FaLock tw="text-sm sm:text-xl text-green-500" />
          <div tw="h-[2rem] w-[1px] bg-gray-600"></div>
          <div tw="text-sm sm:text-xl">
            <p tw="font-bold">Pago seguro</p>
            <span tw="text-gray-400">256-bit SSL Secure</span>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer tw="bg-gray-600 py-12 mt-10 sm:mt-20 xl:mt-32">
        <div tw="container gap-8 grid  lg:grid-cols-3">
          <Link href="/">
            <Image
              tw="w-[100px] lg:w-[150px]"
              width={150}
              height={150}
              src="/img/logo.png"
              alt="logo"
            />
          </Link>
          <ul tw="flex flex-col gap-3">
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
            <li>
              <a href="#">Politica de privacidad</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
          <ul tw="flex  gap-7">
            <li>
              <a href="#">
                {' '}
                <FaFacebook size={25} />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTwitter size={25} />
              </a>
            </li>
            <li>
              <a href="#">
                <FaLinkedin size={25} />
              </a>{' '}
            </li>
            <li>
              <a href="#">
                {' '}
                <FaYoutube size={25} />
              </a>
            </li>
          </ul>
          <hr tw="lg:col-span-3 mt-8 " />
          <p tw="pt-8">&copy; 2023 Game Shop. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
