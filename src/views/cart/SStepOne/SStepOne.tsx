import { ICartItem } from '../../../interfaces'
import { Cesta } from './Cesta/Cesta'
import { Resume } from './Resume/Resume'

interface Props {
  games: ICartItem[]
}
export const SStepOne = ({ games }: Props) => {
  return (
    <section tw="container grid xl:[grid-template-columns:1fr 28rem] gap-20 mt-10 md:mt-12">
      <Cesta games={games} />
      <Resume games={games} />
    </section>
  )
}
