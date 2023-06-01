import { FC, PropsWithChildren } from 'react'
import { Header } from '../../ui'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Head from 'next/head'
interface Props {
  fix?: boolean
  isOpenSearch?: boolean
  title?: string
}
export const BasicLayout: FC<PropsWithChildren<Props>> = ({
  children,
  fix = true,
  isOpenSearch,
  title = 'Game Shop',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* seo && Schemas */}

        <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
      </Head>
      <Header fix={fix} isOpenSearch={isOpenSearch} />
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
