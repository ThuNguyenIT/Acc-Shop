import { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next'
import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { createResponse, getErrorMessage, getRequestInfo } from '@/lib/utils'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { old_password, new_password, confirm_new_password } =
      await req.json()

    const userId = parseInt(params.id)
    const sessionId = req.cookies.get('sessionId')?.value

    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return createResponse('Không tìm thấy', null, 404)
    }

    if (old_password) {
      const passwordMatch = await bcrypt.compare(
        old_password,
        existingUser.password
      )
      if (!passwordMatch) {
        return createResponse('Mật khẩu cũ không chính xác', null, 400)
      }
    }

    if (new_password !== confirm_new_password) {
      return createResponse('Xác nhận mật khẩu mới không khớp', null, 400)
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10)
    const { userAgent, ipAddress } = getRequestInfo(req)

    await prisma.users.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        user_activities: {
          create: {
            action: 'USER_UPDATE_PASSWORD',
            description: 'Cập nhật mật khẩu',
            ip_address: ipAddress,
            user_agent: userAgent,
            session_id: getCookie('session_id') ?? sessionId
          }
        }
      }
    })

    return createResponse('Thành công')
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}
