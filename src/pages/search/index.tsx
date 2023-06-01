import { useEffect } from 'react'
import { BasicLayout } from '../../components/layouts'
import { GetServerSideProps } from 'next'
import { Game } from '../../api'
import { IGames } from '../../interfaces'
import { GridGames, Pagination } from '../../components/ui'

interface Props {
  games: IGames[]
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    total: number
  }
  searchText: string
}
const SearchPage = ({ games, pagination, searchText }: Props) => {
  const hasResult = games.length > 0

  useEffect(() => {
    document.getElementById('search-games')?.focus()
  }, [])
  return (
    <BasicLayout
      fix={false}
      isOpenSearch={true}
      title={`Game Shop | ${searchText}`}
    >
      <section tw="container">
        <h1 tw="text-2xl lg:text-4xl font-bold mb-12">
          {' '}
          {searchText === ''
            ? 'Juegos que te pueden interesar'
            : `Buscando: ${searchText}`}
        </h1>
        {hasResult ? (
          <>
            <GridGames games={games} />
            <Pagination pagination={pagination} />
          </>
        ) : (
          <p tw="text-gray-400 text-center">No se econtraron resultados 😪</p>
        )}
      </section>
    </BasicLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { s = '', page = 1 } = query

  const searchStr = s.toString()
  const pageNumber = page.toString()
  const gameCtrl = new Game()

  const response = await gameCtrl.searchGames(searchStr, pageNumber)
  return {
    props: {
      games: response.data,
      pagination: response.meta.pagination,
      searchText: s,
    },
  }
}
export default SearchPage
