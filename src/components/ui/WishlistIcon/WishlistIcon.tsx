import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { TwStyle } from 'twin.macro'
import { Wishlist } from '../../../api'
import { useAuth } from '../../../hooks'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from './WishlistIcon.module.css'

const MySwal = withReactContent(Swal)
interface Props {
  gameId?: number
  styleIcon?: TwStyle
  removeCallback?: () => void
}

interface IWishList {
  id: number
  attributes: {
    createdAt: string
    publishedAt: string
    updatedAt: number
  }
}

const wishlistCtrl = new Wishlist()

export const WishlistIcon = ({ gameId, styleIcon, removeCallback }: Props) => {
  const { user } = useAuth()
  const [isHovered, setIsHovered] = useState(false)
  const [hasWishList, setHasWishList] = useState<Boolean | null | IWishList>(
    null,
  )

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    const getWishlist = async () => {
      if (user && user.id) {
        try {
          // Si hay algo entarara a esa pagina y checkiara si mi usuario tiene en favoritos tal producto si tiene data activara y pondra el setHasWishList en true o metera la info de ese producto en favoritos si no retornara un false
          const response = await wishlistCtrl.check(user.id, gameId)
          setHasWishList(response)
        } catch (error) {
          setHasWishList(false)
          console.log(error)
        }
      }
    }
    getWishlist()
  }, [user, gameId])

  const onSesion = () => {
    MySwal.fire({
      title: <p tw="font-normal text-xl text-white">Por favor inicia sesión</p>,
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'button-confirm',
        popup: 'popup-bg',
      },
    })
  }
  const addWishlist = async () => {
    try {
      const response = await wishlistCtrl.add(user.id, gameId)
      setHasWishList(response)
      await MySwal.fire({
        title: (
          <p tw="font-normal text-xl text-white">
            Producto añadido a favoritos 😉
          </p>
        ),
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: styles['favoritos-confirm'],
          popup: styles['favoritos-bg'],
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(hasWishList)

  const deleteWishlist = async () => {
    try {
      //Esa validación quiere decir si en mi hasWishList hay una propiedad “id” en hasWishList quiere decir que ya no es nula, si es así ten esa propiedad de manera segura
      if (hasWishList && 'id' in hasWishList) {
        await wishlistCtrl.delete(hasWishList.id)
        setHasWishList(false)
        await MySwal.fire({
          title: (
            <p tw="font-normal text-xl text-white">
              Producto eliminado de favoritos 😢
            </p>
          ),
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: styles['favoritos-confirm'],
            popup: styles['favoritos-bg'],
          },
        })
        removeCallback && removeCallback()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        tw="cursor-pointer"
        css={styleIcon}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (user.name === '') {
            onSesion()
          } else {
            hasWishList ? deleteWishlist() : addWishlist()
          }
        }}
      >
        {isHovered || hasWishList ? (
          <AiFillHeart size={25} tw="text-orange-600" />
        ) : (
          <AiOutlineHeart size={25} />
        )}
      </div>
    </>
  )
}
