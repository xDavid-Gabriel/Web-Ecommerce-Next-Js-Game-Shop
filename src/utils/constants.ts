export const ENV = {
  SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    AUTH: {
      REGISTER: 'auth/local/register',
      LOGIN: 'auth/local',
    },
    USER_ME: 'users/me',
    USER: 'users',
    PLATFORM: 'platforms',
    ADDRESS: 'addresses',
    GAME: 'games',
    WISHLIST: 'wishlists',
    PAYMENT_ORDER: 'payment-order',
    ORDER: 'orders',
  },
  TOKEN: 'token',
  CART: 'cart',
}
