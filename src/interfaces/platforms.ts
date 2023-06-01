export interface IPlatforms {
  id: number
  attributes: IAttributes
}

type IAttributes = {
  title: string
  slug: string
  order: number
  icon: IIconData
}

type IIconData = {
  data: IIconDataAttributes
}

type IIconDataAttributes = {
  attributes: IIconImage
}

type IIconImage = {
  url: string
}
