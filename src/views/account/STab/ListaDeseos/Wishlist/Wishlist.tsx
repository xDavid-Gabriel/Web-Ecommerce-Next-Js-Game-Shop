import { useState, useEffect } from 'react'
import { Wishlist as WishlistCtrl } from '../../../../../api'
import { useAuth } from '../../../../../hooks'
import { GridGames } from '../../../../../components/ui'
import { PurpleAttributes } from '../../../../../interfaces'

const wishlistCtrl = new WishlistCtrl()
interface IWishlist {
  attributes: {
    game: {
      data: {
        id: number
        attributes: PurpleAttributes
      }
    }
  }
}
export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [reload, setReload] = useState(false)

  const { user } = useAuth()

  const onReload = () => setReload(prevState => !prevState)
  useEffect(() => {
    const getAllWishlist = async () => {
      try {
        const response = await wishlistCtrl.getAll(user.id)
        setWishlist(response)
      } catch (error) {
        console.log(error)
      }
    }

    getAllWishlist()
  }, [reload])

  const wishlistAll = wishlist.map((wish: IWishlist) => {
    return {
      id: wish.attributes.game.data.id,
      attributes: wish.attributes.game.data.attributes,
    }
  })

  return (
    <div>
      <GridGames games={wishlistAll} wishlistIcon={true} onReload={onReload} />
    </div>
  )
}
