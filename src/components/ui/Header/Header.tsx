import Link from 'next/link'
import Image from 'next/image'
import { useAuth, useCart } from '../../../hooks'
import { RiShoppingCartFill } from 'react-icons/ri'
import { BiUserCircle } from 'react-icons/bi'
import tw from 'twin.macro'
import { Platforms } from './Platforms/Platforms'
import { FaBars } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { Search } from '../Search/Search'
import { Platform } from '../../../api'
import { IPlatforms } from '../../../interfaces'
import { useRouter } from 'next/router'

const platformCtrl = new Platform()

interface Props {
  fix: boolean
  isOpenSearch?: boolean
}
export const Header = ({ fix = true, isOpenSearch }: Props) => {
  const router = useRouter()
  const { user } = useAuth()
  const { total } = useCart()
  const [openMenu, setOpenMenu] = useState(false)
  const toogleMenu = () => setOpenMenu(prevState => !prevState)

  const [platforms, setPlatforms] = useState<IPlatforms[]>([])

  //Peticion a una api
  useEffect(() => {
    const getPlatforms = async () => {
      const { data } = await platformCtrl.getAll()

      setPlatforms(data)
    }
    getPlatforms()

    return () => {
      setPlatforms([])
    }
  }, [])
  return (
    <header
      tw="container justify-between flex py-4  left-0 right-0 top-0 items-center z-10 "
      css={fix ? tw`fixed` : tw`sticky`}
    >
      <Link href="/">
        <Image
          width={150}
          tw="w-[100px] lg:w-[150px]"
          height={150}
          src="/img/logo.png"
          alt="logo"
        />
      </Link>
      <div tw="hidden lg:contents">
        {/* Platforms */}
        <Platforms platforms={platforms} isOpenSearch={isOpenSearch} />
        {/* Acount */}
        <div tw="gap-10 items-center hidden lg:flex">
          <Link
            //href={user.name !== '' ? '/cart' : '/join/sign-in'}
            href="/cart"
            tw="flex gap-1 items-center"
            className="group"
          >
            <RiShoppingCartFill
              size={27}
              tw="group-hover:text-orange-600 transition duration-300"
            />
            {total > 0 && (
              <div tw="w-[1.4rem] h-[1.4rem] grid place-content-center rounded-full bg-orange-600 font-semibold">
                {total}
              </div>
            )}
          </Link>

          <Link href={user.name !== '' ? '/account' : '/join/sign-in'}>
            <div
              tw="transition duration-300"
              css={
                user.name !== ''
                  ? tw`bg-gray-600 p-1 rounded-[10px] border-[2px] border-transparent hover:border-orange-600 `
                  : tw`hover:text-orange-600`
              }
            >
              <BiUserCircle size={28} />
            </div>
          </Link>
        </div>
      </div>
      <div tw="lg:hidden">
        {/* Acount */}
        <div tw="gap-3 items-center flex">
          <Link
            //href={user.name !== '' ? '/cart' : '/join/sign-in'}
            href="/cart"
            tw="flex gap-1 items-center"
            className="group"
          >
            <RiShoppingCartFill
              size={27}
              tw="group-hover:text-orange-600 transition duration-300"
            />
            {total > 0 && (
              <div tw="w-[1.4rem] h-[1.4rem] grid place-content-center rounded-full bg-orange-600 font-semibold">
                {total}
              </div>
            )}
          </Link>

          <Link href={user.name !== '' ? '/account' : '/join/sign-in'}>
            <div
              tw="transition duration-300"
              css={
                user.name !== ''
                  ? tw`bg-gray-600 p-1 rounded-[10px] border-[2px] border-transparent hover:border-orange-600 `
                  : tw`hover:text-orange-600`
              }
            >
              <BiUserCircle size={28} />
            </div>
          </Link>
          <button tw="z-10 cursor-pointer " onClick={toogleMenu}>
            {openMenu ? (
              <MdClose tw="text-white" size={30} />
            ) : (
              <FaBars size={30} tw="text-orange-600" />
            )}
          </button>
        </div>
      </div>

      {/* Nav Mobile */}
      <nav
        tw="fixed top-0 transition duration-300 max-w-[400px] w-full min-h-screen pt-[62px] px-4 right-0 flex flex-col gap-5 bg-gray-800 lg:hidden"
        css={openMenu ? tw`translate-x-0` : tw`translate-x-[100%]`}
      >
        {' '}
        <div tw="relative h-[65px]">
          <Search toogleMenu={toogleMenu} />
        </div>
        <span tw="font-medium text-xl">Plataformas</span>
        {/* Platforms */}
        <ul tw="flex flex-col gap-4">
          {platforms.map(platform => (
            <li key={platform.id}>
              <Link
                onClick={toogleMenu}
                href={`/games/${platform.attributes.slug}`}
                tw="flex gap-3 transition duration-300 hover:text-orange-600"
                css={
                  router.asPath.includes(`${platform.attributes.slug}`)
                    ? tw`text-orange-600`
                    : ''
                }
              >
                <Image
                  tw="flex-none w-5 h-5 [filter: brightness(0) invert(1)] object-contain"
                  width={25}
                  height={25}
                  src={platform.attributes.icon.data.attributes.url}
                  alt={platform.attributes.title}
                />
                {platform.attributes.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
