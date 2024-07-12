import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's additional attributes. */
      id: number | string | null
      accessToken: string | null
    } & DefaultSession['user']
    /** JSON Web Token */
    accessToken: string | null
  }
  interface Profile {
    id: number | string | null
  }
  interface User {
    id: number | string | null
    accessToken: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string | null
    id: number | string | null
  }
}
