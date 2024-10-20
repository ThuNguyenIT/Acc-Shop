import { refreshJwt } from '@/lib/jwt'
import { createResponse, getErrorMessage } from '@/lib/utils'

export async function POST(request: Request) {
  const { token } = await request.json()
  try {
    const newToken = refreshJwt(token)
    return createResponse('Thành công', newToken)
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 403)
  }
}
