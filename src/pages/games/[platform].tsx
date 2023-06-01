import { GetServerSideProps } from 'next'
import { Platform, Game } from '../../api'
import { IGames, IPlatforms } from '../../interfaces'
import { BasicLayout } from '../../components/layouts'
import { GridGames, Pagination } from '../../components/ui'

interface Props {
  platform: IPlatforms
  games: IGames[]
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    total: number
  }
}

const PlatformPage = ({ platform, games, pagination }: Props) => {
  const hasProducts = games.length > 0

  return (
    <BasicLayout fix={false} title={`Game Shop | ${platform.attributes.title}`}>
      <section tw="container">
        <h1 tw="text-2xl lg:text-4xl font-bold mb-10">
          {platform.attributes.title}
        </h1>
        {hasProducts ? (
          <>
            <GridGames games={games} />
            <Pagination pagination={pagination} />
          </>
        ) : (
          <p tw="text-gray-400 text-center">
            La categoria de {platform.attributes.title} no tiene productos 😪
          </p>
        )}
      </section>
    </BasicLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const { page = 1 } = query
  const pageNumber = page.toString()
  //"platform" seria el slug
  const { platform } = params as { platform: string }
  //Obteniendo plataforma por el slug
  const platformCtrl = new Platform()
  const responsePlatform = await platformCtrl.getBySlug(platform)
  //Si es que no hay esa plataforma se le manda a un notFound
  if (!responsePlatform) {
    return {
      notFound: true,
    }
  }

  //Obteniendo juegos que pertenecen a la plataforma por el slug
  const gameCtrl = new Game()
  const responseGames = await gameCtrl.getGamesByPlatformSlug(
    platform,
    pageNumber,
  )

  return {
    props: {
      platform: responsePlatform,
      games: responseGames.data,
      pagination: responseGames.meta.pagination,
    },
  }
}
export default PlatformPage
