import axios from 'axios'
import { ENV } from '../utils'
interface IGetLastestPublishedParams {
  limit?: number
  platformId?: number | null | undefined
}
export class Game {
  //Ultimo juego publicado
  async getLastPublished() {
    try {
      const sort = 'sort=publishedAt:desc'
      const pagination = 'pagination[limit]=1'
      const populate = 'populate=*'
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`
      //Petition get whit axios

      const { data } = await axios.get(url)

      if (!data) {
        throw 'Error'
      }
      return data
    } catch (error) {
      throw error
    }
  }
  //Ultimos juegos publicado
  async getLastestPublished({
    limit = 9,
    platformId = null,
  }: IGetLastestPublishedParams) {
    try {
      const filterPlatform =
        platformId && `filters[platform][id][$eq]=${platformId}`
      const paginationLimit = `pagination[limit]=${limit}`
      const sort = `sort[0]=publishedAt:desc`
      const populate = `populate=*`

      const urlParams = `${sort}&${paginationLimit}&${filterPlatform}&${populate}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`
      //Petition get whit axios

      const { data } = await axios.get(url)
      if (!data) {
        throw 'Error'
      }
      return data
    } catch (error) {
      throw error
    }
  }

  async getGamesByPlatformSlug(slug: string, page: string) {
    try {
      const filters = `filters[platform][slug][$eq]=${slug}`
      //Esta paginacion "page" sirve por ejemplo para el numero de paginas para la paginacion 1,2,3,4 y asi, el "pageSize" es cuantos elementos va traer puede ser "1" o "20" o "25" productos los que desees siempre y cuando haya esos productos en la api, resumen seria la variable ""page"" la pagina 1 me traera los primeros elementos indicados en el "pageSize" y si hay mas o menos "pageSize" el page de numeros crecera o disminuira de acuerdo a los productos que tiene para que me pueda traer todos los productos
      const pagination = `pagination[page]=${page}&pagination[pageSize]=3`
      const populate = 'populate=*'
      const urlParams = `${filters}&${pagination}&${populate}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`

      const { data } = await axios.get(url)

      if (!data) {
        throw new Error('No data')
      }

      return data
    } catch (error) {
      console.log(error)
    }
  }

  async searchGames(text: string, page: string) {
    try {
      const filters = `filters[title][$contains]=${text}`
      const pagination = `pagination[page]=${page}&pagination[pageSize]=3`
      const populate = 'populate=*'
      const urlParams = `${filters}&${pagination}&${populate}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`
      const { data } = await axios.get(url)
      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }
  //Traer todos los juegos
  async getGamesAll() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}`
      const { data } = await axios.get(url)
      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }
  //Filtrado de traer un producto por el slug
  async getBySlug(slug: string) {
    try {
      const filter = `filters[slug][$eq]=${slug}`
      const populateGame =
        'populate[0]=wallpaper&populate[1]=cover&populate[2]=screenshots&populate[3]=platform'
      const populatePlatform = 'populate[4]=platform.icon'

      const populates = `${populateGame}&${populatePlatform}`

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filter}&${populates}`

      const { data } = await axios.get(url)
      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  async getGameById(id: string) {
    try {
      const populate = `populate[0]=cover&populate[1]=platform`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${id}?${populate}`
      const { data } = await axios.get(url)

      if (!data) {
        throw new Error('No data')
      }
      return data
    } catch (error) {
      throw error
    }
  }
}
