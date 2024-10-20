import { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { randomBytes, randomUUID } from 'crypto'

import { signJwt, verifyJwt } from './lib/jwt'
import { NODE_API_AUTH_URL, NODE_ENV } from './constants/env'

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    }),
    CredentialProvider({
      credentials: {
        username: {
          type: 'username'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Vui lòng nhập username và mật khẩu')
        }

        try {
          const res = await fetch(`${NODE_API_AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          })

          if (!res.ok) {
            if (res.status === 404 || res.status === 401) {
              throw new Error('Username hoặc mật khẩu không hợp lệ')
            }

            throw new Error('Đăng nhập không thành công')
          }

          const user = await res.json()

          if (user) {
            return user
          }

          return null
        } catch (error) {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/(auth)/(signin)'
  },
  debug: NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex')
    }
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    async encode({ token }) {
      const jwtPayload = {
        user_id: token?.sub ? parseInt(token.sub) : undefined,
        username: token?.name || ''
      }

      return signJwt(jwtPayload)
    },
    async decode({ token }) {
      return verifyJwt(token as string)
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error.message, error)
    },
    warn(message) {
      // eslint-disable-next-line no-console
      console.warn('Warning:', message)
    },
    debug(message) {
      // eslint-disable-next-line no-console
      console.debug('Debug:', message)
    }
  }
} satisfies NextAuthConfig

export default authConfig
