import { FC, PropsWithChildren } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../../../hooks'
import { useRouter } from 'next/router'
import Head from 'next/head'
interface Props {
  title?: string
}
export const JoinLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  const { user } = useAuth()
  const router = useRouter()
  console.log(user)
  // if (user) {
  //   router.push('/')
  //   return null
  // }
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* seo && Schemas */}

        <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
      </Head>
      <header tw="container py-4 fixed w-full">
        <Link href="/">
          <Image
            width={150}
            tw="w-[150px]"
            height={150}
            src="/img/logo.png"
            alt="logo"
          />
        </Link>
      </header>
      <main tw="bg-gray-900 min-h-screen">{children}</main>
    </>
  )
}
