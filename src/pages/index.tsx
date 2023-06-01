import { GetStaticProps } from 'next'
import { Game } from '../api'
import { Home } from '../views/home'
import { BasicLayout } from '../components/layouts'
import { IGames } from '../interfaces'

interface Props {
  lastPubDate: IGames
}

const platformsId = {
  playstation: 1,
  xbox: 2,
  nintendo: 3,
  pc: 4,
}
const gameCtrl = new Game()

const HomePage = ({ lastPubDate }: Props) => {
  return (
    <BasicLayout>
      <Home.SBannerLastGamePublished lastPubDate={lastPubDate} />
      <Home.SLatestGames title="Ultimos Lanzamientos" />
      <Home.BarTrust />
      <Home.SLatestGames
        title="PlayStation"
        limit={3}
        platformId={platformsId.playstation}
      />
      <Home.BannerAd
        title="Resgitrate y obten los mejores precios"
        subTitle="!Compara con otros juegos y elige el tuyo!"
        btnLink="/join/sign-up"
        btnTitle="Entrar ahora"
        image="/img/img01.webp"
      />
      <Home.SLatestGames title="Xbox" limit={3} platformId={platformsId.xbox} />
    </BasicLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  //Petition get whit axios
  //El hero
  const { data } = await gameCtrl.getLastPublished()
  const lastPubDate = data[0]

  return {
    props: {
      lastPubDate,
    },

    revalidate: 10,
  }
}
export default HomePage
