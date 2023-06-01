import { IGames } from '../../../interfaces'
import { Gallery } from './Gallery/Gallery'
import { Video } from './Video/Video'

interface Props {
  video: string
  screnshots: IGames
}
export const SMedia = ({ video, screnshots }: Props) => {
  return (
    <section tw="container mt-10 lg:mt-[-120px]">
      <h2 tw="font-bold text-xl mb-10 sm:text-4xl">Visuales</h2>
      <Video video={video} />
      <Gallery gameScrenshots={screnshots} />
    </section>
  )
}
