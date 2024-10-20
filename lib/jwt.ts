import { SignJWT, jwtVerify } from 'jose'

import { JWT_SECRET, JWT_EXPIRED } from '@/constants/jwt'
import { getErrorMessage } from './utils'

export async function signJwt(
  payload: Record<string, any>,
  expiresIn: string | number = JWT_EXPIRED
) {
  try {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' }) // Use HMAC SHA-256 algorithm
      .setExpirationTime(expiresIn)
      .sign(JWT_SECRET)
    return jwt
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload 
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function refreshJwt(
  token: string,
  expiresIn: string | number = JWT_EXPIRED
) {
  try {
    const payload = await verifyJwt(token)
    return await signJwt(payload, expiresIn)
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
