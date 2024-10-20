export const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || '')
export const JWT_EXPIRED = '30d'
