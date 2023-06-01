import tw, { TwStyle } from 'twin.macro'
import styled from 'styled-components'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  stylesImg?: TwStyle
}
export const OptimizedImage = ({
  src,
  width,
  height,
  alt,
  stylesImg,
}: Props) => {
  return (
    <Image src={src} alt={alt} width={width} height={height} css={stylesImg} />
  )
}

interface OptimizedBgProps {
  src: string
}
export const OptimizedBg = styled.section<OptimizedBgProps>`
  background-repeat: no-repeat; /* Evita que se repita la imagen */
  background-size: cover; /* Ajusta la imagen al tamaño del componente */
  background-position: center;
  /* Imagen para mobile */
  background-image: url(${props => `${props.src}`});
`
/* Imagen para tablets */
//@media (min-width: 768px) {
// background-image: url(${props => `/img/tablet${props.srcTablet}`});
// }

/* Imagen para desktops */
// @media (min-width: 1280px) {
// background-image: url(${props => `/img/desktop${props.srcDesktop}`});
//}
