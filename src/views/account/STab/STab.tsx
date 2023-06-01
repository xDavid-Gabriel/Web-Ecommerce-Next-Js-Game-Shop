import { useState } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import tw from 'twin.macro'
import { Ajustes } from './Ajustes'
import { Direcciones } from './Dirreciones'
import { ListaDeseos } from './ListaDeseos'
import { Ordenes } from './Ordenes'

import { useAuth } from '../../../hooks'
import { useRouter } from 'next/router'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styled from 'styled-components'
const MySwal = withReactContent(Swal)

export const STab = () => {
  const router = useRouter()
  const { logout } = useAuth()
  const [tabsFilter, setTabsFilter] = useState('Mis pedidos')
  //Para "reload" que cuando cambie su estado ejecute algo, en este caso las direcciones que se vayan creando
  const [reload, setReload] = useState(false)

  const onReload = () => setReload(prevState => !prevState)

  const cerrarSesion = async () => {
    const respuesta = await MySwal.fire({
      title: (
        <p tw="font-normal text-xl text-white">
          ¿Estás listo para finalizar tu sesión por hoy?
        </p>
      ),
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'button-confirm',
        popup: 'popup-bg',
      },
    })

    if (respuesta.isConfirmed) {
      logout()
      router.replace('/')
    }
  }

  const ListaDeCuenta = styled.ul`
    display: flex;
    margin-bottom: 1rem;
    border-color: #718096;
    height: 80px;
    overflow-x: auto;

    @media (min-width: 768px) {
      height: auto;
      overflow-x: initial;
      border-bottom-width: 2px;
    }
    // Estilo del thumb (barra de desplazamiento)
    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ea580c;
      border-radius: 100px;
    }
  `
  return (
    <section tw="container">
      <div>
        {/* Lista de cuenta */}
        <ListaDeCuenta>
          <li
            tw="px-6 h-[55px] transition duration-300 flex items-center w-fit relative cursor-pointer hover:text-orange-600 flex-none"
            css={tabsFilter === 'Mis pedidos' ? tw`text-orange-600` : ''}
            className="group"
            onClick={() => setTabsFilter('Mis pedidos')}
          >
            Mis pedidos
            <div
              tw="absolute bottom-[-2px] transition duration-300 left-0 w-full h-[2px] group-hover:bg-orange-600"
              css={tabsFilter === 'Mis pedidos' ? tw`bg-orange-600` : ''}
            />
          </li>
          <li
            tw="px-6 h-[55px] transition duration-300 flex items-center w-fit relative cursor-pointer hover:text-orange-600 flex-none"
            className="group"
            onClick={() => setTabsFilter('Lista de deseos')}
            css={tabsFilter === 'Lista de deseos' ? tw`text-orange-600` : ''}
          >
            Lista de deseos
            <div
              tw="absolute bottom-[-2px] transition duration-300 left-0 w-full h-[2px] group-hover:bg-orange-600"
              css={tabsFilter === 'Lista de deseos' ? tw`bg-orange-600` : ''}
            />
          </li>
          <li
            tw="px-6 h-[55px] transition duration-300 flex items-center w-fit relative cursor-pointer hover:text-orange-600 flex-none"
            className="group"
            onClick={() => setTabsFilter('Díreciones')}
            css={tabsFilter === 'Díreciones' ? tw`text-orange-600` : ''}
          >
            Díreciones
            <div
              tw="absolute bottom-[-2px] transition duration-300 left-0 w-full h-[2px] group-hover:bg-orange-600"
              css={tabsFilter === 'Díreciones' ? tw`bg-orange-600` : ''}
            />
          </li>
          <li tw="ml-auto flex-none">
            <ul tw="flex">
              <li
                tw="px-6 h-[55px] transition duration-300 flex gap-3 items-center w-fit relative cursor-pointer hover:text-orange-600"
                className="group"
                onClick={() => setTabsFilter('Ajustes')}
                css={tabsFilter === 'Ajustes' ? tw`text-orange-600` : ''}
              >
                <FiSettings size={22} />
                Ajustes
                <div
                  tw="absolute bottom-[-2px] transition duration-300 left-0 w-full h-[2px] group-hover:bg-orange-600"
                  css={tabsFilter === 'Ajustes' ? tw`bg-orange-600` : ''}
                />
              </li>
              <li
                onClick={cerrarSesion}
                tw="px-6 h-[55px] transition duration-300 flex items-center w-fit relative cursor-pointer hover:text-orange-600 flex-none"
                className="group"
              >
                <FiLogOut size={22} />
                <div tw="absolute bottom-[-2px] transition duration-300 left-0 w-full h-[2px] group-hover:bg-orange-600" />
              </li>
            </ul>
          </li>
        </ListaDeCuenta>
        {/* Contenido de cuenta */}
        {tabsFilter === 'Mis pedidos' && <Ordenes.ListaOrdenes />}

        {tabsFilter === 'Lista de deseos' && (
          <div tw="px-6">
            <ListaDeseos.Wishlist />
          </div>
        )}

        {tabsFilter === 'Díreciones' && (
          <div tw="px-6">
            <Direcciones.AddAddress onReload={onReload} />
            <Direcciones.ListAddresses reload={reload} onReload={onReload} />
          </div>
        )}

        {tabsFilter === 'Ajustes' && (
          <>
            <Ajustes.ChangeNameForm />
            <div tw="grid sm:grid-cols-2 pb-8 px-6 gap-4">
              <Ajustes.ChangeEmailForm />
              <Ajustes.ChangePasswordForm />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
