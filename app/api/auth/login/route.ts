import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signJwt } from '@/lib/jwt'
import { createResponse, getErrorMessage } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return createResponse('Vui lòng nhập username và mật khẩu', null, 400)
    }

    const user = await prisma.users.findUnique({
      where: { username }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return createResponse('Username hoặc mật khẩu không hợp lệ', null, 401)
    }

    const token = await signJwt({ user_id: user.id, username: user.username }) 

    return createResponse('Thành công', {
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        is_verified: user.is_verified,
        full_name: user.full_name,
        mobile: user.mobile,
        address: user.address,
        birthday: user.birthday
      }
    })
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}
