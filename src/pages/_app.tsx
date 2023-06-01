import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'
import { AuthProvider, CartProvider } from '../contexts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
