import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { authService } from '@/auth/services'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Username', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = authService.authenticateUser(email, password)
        if (user) {
          // Update the id property to be of type string
          return { ...user, accessToken: user.token } as User
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          // const errorMessage = 'Invalid email or password'
          // throw new Error(errorMessage)
        }
      },
    }),
  ],
  // A secret (required in production) to use for key generation
  // (Is not required if NEXTAUTH_SECRET is present in production environment)
  secret: 'AfQQnRBQ+IssUk8fZGkit416HTungzNAgWrZTBC3h00',
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 7 * 24 * 60 * 60, // 7 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex")
    // }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/login', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // https://next-auth.js.org/configuration/callbacks#:~:text=Use%20the-,signIn(),-callback%20to%20control
      // When using the Credentials Provider the user object is the response returned from the authorize callback
      // and the profile object is the raw body of the HTTP POST submission.
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    //* Redirect the user after sign-in
    /*
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },

    /*
     *This JSON Web Token callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {"signIn" | "signUp" | "update" | undefined} trigger Check why the jwt is invoked
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt({ token, account, profile, user, trigger }) {
      if (user) {
        const _user: any = user
        token.id = _user.id
        token.name = _user.name
        token.email = _user.email
        token.accessToken = _user?.token ?? null
      }
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account?.access_token) {
        token.accessToken = account.access_token
        // token.id = profile?.id ?? null
      }
      return token
    },
    /*
     *The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security. If you want to make something available you added to the token through the jwt() callback, you have to explicitly forward it here to make it available to the client.
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      //check the accessToken.. if accessToken is expired, then return null
      if (token?.accessToken) {
        const isValid = authService.verifyToken(`Bearer ${token.accessToken}`)
        if (!isValid) return { expires: new Date().toString() }
      }
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.accessToken = token.accessToken
      return session
    },
  },
  //* Events are useful for logging
  //* https://next-auth.js.org/configuration/events
  events: {
    //* On successful sign in
    signIn: () => {
      //console.log(`isNewUser: ${JSON.stringify(isNewUser)}`)
      //console.log(user)
    },
    session: (message) => {
      console.log(message.session)
    },
  },
}
