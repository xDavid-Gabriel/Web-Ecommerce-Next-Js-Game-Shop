export interface IGames {
  id: number
  attributes: PurpleAttributes
}

export interface PurpleAttributes {
  title: string
  price: number
  discount: number
  slug: string
  summary: string
  video: string
  releaseDate: Date
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  wallpaper: Cover
  cover: Cover
  screenshots: Screenshots
  platform: Platform
}

export interface Cover {
  data: DAT
}

export interface DAT {
  id: number
  attributes: FluffyAttributes
}

export interface FluffyAttributes {
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: ProviderMetadata
  createdAt: Date
  updatedAt: Date
}

export interface Formats {
  thumbnail: Large
  small: Large
  large?: Large
  medium?: Large
}

export interface Large {
  name: string
  hash: string
  ext: EXT
  mime: MIME
  path: null
  width: number
  height: number
  size: number
  url: string
  provider_metadata: ProviderMetadata
}

export enum EXT {
  Webp = '.webp',
}

export enum MIME {
  ImageWebp = 'image/webp',
}

export interface ProviderMetadata {
  public_id: string
  resource_type: ResourceType
}

export enum ResourceType {
  Image = 'image',
}

export interface Platform {
  data: Data
}

export interface Data {
  id: number
  attributes: TentacledAttributes
}

export interface TentacledAttributes {
  title: string
  slug: string
  order: number
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  icon: Cover
}

export interface Screenshots {
  data: DAT[]
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
