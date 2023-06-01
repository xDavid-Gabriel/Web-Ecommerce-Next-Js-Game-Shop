import { useState, useEffect } from 'react'
import { Game } from '../../../api'
import { GridGames } from '../../../components/ui'
import { IGames } from '../../../interfaces'
import { data } from '../../../components/ui/BarTrust/attributes'
const gameCtrl = new Game()

interface Props {
  title: string
  limit?: number
  platformId?: number | undefined | null
}
export const SLatestGames = ({
  title,
  limit = 9,
  platformId = null,
}: Props) => {
  const [games, setGames] = useState<IGames[]>([])

  useEffect(() => {
    const getLastestGame = async () => {
      try {
        const response = await gameCtrl.getLastestPublished({
          limit,
          platformId,
        })

        setGames(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getLastestGame()
  }, [])

  if (!games) return <div>Cargando....</div>
  return (
    <section tw="container">
      <h2 tw="font-bold text-xl mb-10 sm:text-4xl">{title}</h2>
      <GridGames games={games} />
    </section>
  )
}
