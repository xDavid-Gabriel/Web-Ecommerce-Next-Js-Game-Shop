import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MdClose } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import tw from 'twin.macro'

interface Props {
  isOpenSearch?: boolean
  toogleMenu?: (() => void) | undefined
}
export const Search = ({ isOpenSearch, toogleMenu }: Props) => {
  const router = useRouter()
  const [toogleSearch, setToogleSearch] = useState(isOpenSearch)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSearchText(router.query.s?.toString() || '')
  }, [])
  const onSearch = (text: string) => {
    setSearchText(text)
    router.push(`/search?s=${text}`)
    // if (text.trim().length === 0) return
  }

  return (
    <>
      <button
        tw="absolute right-0 z-10 bg-orange-600  rounded-full h-[65px] w-[65px] grid place-content-center hover:bg-yellow-600 transition duration-300 lg:z-[initial] lg:[position: initial]"
        onClick={() => {
          if (toogleMenu) {
            toogleMenu()
          }
          setToogleSearch(!toogleSearch)
        }}
      >
        <BsSearch size={20} />
      </button>
      <form
        tw="w-full absolute top-0 bottom-0 right-0 transition-[width] duration-300 lg:z-[initial]"
        onSubmit={e => e.preventDefault()}
        css={toogleSearch ? tw`w-full` : tw`lg:w-0 overflow-hidden`}
      >
        <input
          id="search-games"
          type="text"
          placeholder="Buscar juego"
          tw="bg-white placeholder:text-gray-900 text-gray-900 pl-7 w-full h-full rounded-full focus:border-orange-600 border-[2px] outline-none"
          value={searchText}
          onChange={e => onSearch(e.target.value)}
        />
        <MdClose
          onClick={() => setToogleSearch(!toogleSearch)}
          size={30}
          tw="hidden absolute cursor-pointer right-0 translate-x-[120%] top-[50%] translate-y-[-50%] lg:block"
        />
      </form>
    </>
  )
}
