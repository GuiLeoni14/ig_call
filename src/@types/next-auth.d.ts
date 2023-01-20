import 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line
  interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }
}
