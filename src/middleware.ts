import { NextResponse, type NextRequest } from 'next/server'

import * as jose from 'jose'

export async function middleware(req: NextRequest) {
  //Primero, se obtiene la ruta anterior de la página del objeto de solicitud req utilizando, tendra el path a donde se iba dirigir
  const previousPage = req.nextUrl.pathname
  //Obtengo la token
  const token = req.cookies.get('token')?.value || ''
  //En resumen, startsWith es un método útil para verificar si una cadena comienza con una subcadena específica. En este caso, se utiliza para verificar si la ruta anterior de la página (previousPage) comienza con '/join', lo que indica que el usuario está intentando acceder a la página login estando auntenticado.
  if (previousPage.startsWith('/join') && token) {
    try {
      //Con la biblioteca "jose" vamos a verificar la token
      await jose.jwtVerify(
        //token:cambiante
        token,
        //Firma:
        //Se utiliza new TextEncoder().encode() para codificar una cadena de caracteres en una matriz de bytes (ArrayBuffer) para poder proporcionarla como argumento a algoritmos de criptografía o firma que requieren una secuencia de bytes en lugar de una cadena de caracteres. (practicamente para evitar errores en la firma con la biblioteca "jose" al verificar la token con la firma)
        new TextEncoder().encode(process.env.JWT_SECRET_SEED),
      )
      //Si todo pasa, hay la token y se verifica, que lo diriga a la home

      return NextResponse.redirect(
        new URL(
          `/`,
          //"req.url" A la pagina que se iba redirigir remplazalo por el "nuevo url"
          req.url,
        ),
      )
    } catch (error) {
      //Si sale un error o no tiene la rediriguelo a login
      return NextResponse.redirect(
        //Este es el nuevo "url""
        new URL(
          `/join/sign-in`,
          //"req.url" A la pagina que se iba redirigir remplazalo por el "nuevo url"
          req.url,
        ),
      )
    }
  }

  if (previousPage.startsWith('/account') && !token) {
    try {
      await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED),
      )
      return NextResponse.redirect(new URL('/account', req.url))
    } catch (error) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/join/:path*', '/account/:path*'],
}
