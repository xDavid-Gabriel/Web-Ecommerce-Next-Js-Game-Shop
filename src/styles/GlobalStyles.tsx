import { createGlobalStyle, CSSObject } from 'styled-components'
import tw, { theme, globalStyles } from 'twin.macro'

const GlobalStyles = createGlobalStyle`
  body{
    ${tw`bg-gray-900 text-white`}
  }
  img{
    ${tw`w-full h-full object-cover`}
  }
/* Estilos para el swetAlert */


.button-confirm {
  background: #ea580c !important;
  border-radius: 10px !important;
}
.button-confirm:focus {
  box-shadow: none !important;
}

.popup-bg {
  background: rgb(75 85 99 / 1) !important;
  border-radius: 10px !important;
}
${{ ...(globalStyles as CSSObject) }}
`

export default GlobalStyles
