import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signJwt } from '@/lib/jwt'
import { createResponse, getErrorMessage } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return createResponse('Vui lòng nhập email và mật khẩu', null, 400)
    }

    const user = await prisma.users.findUnique({
      where: { email }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return createResponse('Email hoặc mật khẩu không hợp lệ', null, 401)
    }

    const token = await signJwt({ user_id: user.id, email: user.email }) 

    return createResponse('Đăng nhập thành công!', {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        mobile: user.mobile,
        social_network: user.social_network,
        is_verified: user.is_verified,
        status: user.status,
        type_user: user.type_user,
      }
    })
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}
