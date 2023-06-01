import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'

interface Props {
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    total: number
  }
}
export const Pagination = ({ pagination }: Props) => {
  const router = useRouter()
  console.log({ pagination })

  const [activePage, setActivePage] = useState(1)
  console.log(router.query)

  useEffect(() => {
    //Si llega undefined al ir a otra plataforma has que "page" valga 1, para que por  defecto me liste la primera pagina, si no que siga teniendo la misma query 1,2,3
    const page = router.query.page === undefined ? 1 : Number(router.query.page)
    console.log({ page })

    setActivePage(page)
  }, [router.query.page])

  const handlePageClick = (data: { selected: number }) => {
    let currentPage = data.selected + 1
    //chapame la query y introduce en la query una propiedad mas llamada "page" que su valor tendra al numero de la paginacion que se le hizo click, entonces la url tendria que verse asi ""http://localhost:3000/games/playstation?page=2" seria el "router.query" que al comienzo trae las una plataforma del getServerSideProps, osea solamente al comienzo inicia con una plataforma y su pagina 1 por defecto, pero al hacer click en la paginacion se le agrega la query "page" con el numero de la pagina que se le hizo click, entonces la url tendria que verse asi ""http://localhost:3000/games/playstation?page=2"
    router.replace({
      query: { ...router.query, page: currentPage },
    })
    setActivePage(currentPage)
  }

  return (
    <div>
      <ReactPaginate
        previousLabel={<MdOutlineKeyboardArrowLeft size={30} />}
        nextLabel={<MdOutlineKeyboardArrowRight size={30} />}
        breakLabel="..."
        pageCount={pagination.pageCount}
        // marginPagesDisplayed={1}
        // pageRangeDisplayed={1}
        previousClassName={styles['pagination__previous']}
        nextClassName={styles['pagination__previous']}
        marginPagesDisplayed={2}
        disabledClassName={styles['pagination__disabled']}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        pageClassName={styles['pagination__item']}
        pageLinkClassName={styles['pagination__link']}
        breakClassName={styles['pagination__break']}
        activeLinkClassName={styles['pagination--active']}
        //El prop forcePage se utiliza para especificar la página actual que se debe resaltar en la paginación. La propiedad toma un valor numérico que indica la página activa actual. En este caso particular, se le resta 1 al valor de activePage porque la paginación comienza en la página 0 y no en la página 1. Por lo tanto, si la página actual es 1, forcePage se establecerá en 0 y así sucesivamente. Esto asegura que la página activa se resalte correctamente en la paginación.
        forcePage={activePage - 1}
      />
    </div>
  )
}
