import { GetStaticPaths, GetStaticProps } from 'next'
import { BasicLayout } from '../components/layouts'
import { Game } from '../api'
import { IGames } from '../interfaces'
import { GamesSlug } from '../views/game'

const gameCtrl = new Game()
interface Props {
  game: IGames
}
const GamePage = ({ game }: Props) => {
  const wallpaper = game.attributes.wallpaper
  return (
    <BasicLayout title={`Game Shop ${game.attributes.title}`}>
      <GamesSlug.SHeaderWallpaper
        image={wallpaper.data.attributes.url}
        titleAlt={game.attributes.title}
      />
      <GamesSlug.SPanel gameId={game.id} game={game} />
      <GamesSlug.SMedia video={game.attributes.video} screnshots={game} />
    </BasicLayout>
  )
}
export const getStaticPaths: GetStaticPaths = async ctx => {
  const { data } = await gameCtrl.getGamesAll()
  const gamesSlug: string[] = data.map((game: IGames) => game.attributes.slug)

  return {
    paths: gamesSlug.map(slug => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { data } = await gameCtrl.getBySlug(slug)

  if (data.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      revalidate: 10,
    }
  }
  return {
    props: {
      // game: data[0].attributes.title,
      game: data[0],
    },
    revalidate: 10,

    //revalidate: 86400,
  }
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params as { slug: string }
//   try {
//     const { data } = await gameCtrl.getBySlug(slug)
//     const games = data[0].attributes.title

//     if (!games) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       }
//     }
//     return {
//       props: {
//         games,
//       },
//       revalidate: 10,
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       notFound: true,
//     }
//   }
// }
export default GamePage
