import { BiUserPin } from 'react-icons/bi'
import { useAuth } from '../../../hooks'
import { DateTime } from 'luxon'
export const SInfo = () => {
  const { user } = useAuth()
  return (
    <section tw="container">
      <h1 tw="text-3xl font-bold pt-8">Información de la cuenta</h1>
      <div tw="flex flex-col gap-4 items-center pb-8">
        <BiUserPin size={200} />
        <h2 tw="font-bold text-xl">{user?.username}</h2>
        <h3 tw="font-bold text-xl">{user?.name}</h3>
        <h4 tw="font-bold text-xl break-all">{user?.email}</h4>
        <p tw="font-semibold">
          Miembro desde:{' '}
          {user?.createdAt
            ? DateTime.fromISO(user.createdAt, { locale: 'es' }).toFormat('DDD')
            : 'Fecha de creación desconocida'}
        </p>
      </div>
    </section>
  )
}
