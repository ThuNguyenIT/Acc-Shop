import { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next'

import { prisma } from '@/lib/prisma'
import { createResponse, getErrorMessage, getRequestInfo } from '@/lib/utils'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!user) return createResponse('Tài khoản không tồn tại', null, 404)

    return createResponse('Thành công', user)
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { username, email, full_name, mobile, address, birthday, role_ids } =
      await req.json()

    const userId = parseInt(params.id)
    const sessionId = req.cookies.get('sessionId')?.value

    const existingUser = await prisma.users.findFirst({
      where: {
        id: userId,
        OR: [
          { username: username, id: { not: userId } },
          { email: email, id: { not: userId } }
        ]
      }
    })

    if (existingUser) {
      return createResponse(
        'Tài khoản không tồn tại hoặc xung đột username/email',
        null,
        404
      )
    }

    const parsedBirthday = birthday ? new Date(birthday) : null
    const { userAgent, ipAddress } = getRequestInfo(req)

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        username,
        email,
        full_name,
        mobile,
        address,
        birthday: parsedBirthday,
        user_activities: {
          create: {
            action: 'USER_UPDATE',
            description: 'Cập nhật tài khoản',
            ip_address: ipAddress,
            user_agent: userAgent,
            session_id: getCookie('session_id') ?? sessionId
          }
        }
      }
    })

    if (Array.isArray(role_ids) && role_ids.length > 0) {
      const currentRoles = await prisma.user_roles.findMany({
        where: { user_id: userId }
      })

      const currentRoleIds = currentRoles.map((role) => role.role_id)

      const rolesToRemove = currentRoleIds.filter(
        (roleId) => !role_ids.includes(roleId)
      )
      if (rolesToRemove.length > 0) {
        await prisma.user_roles.deleteMany({
          where: {
            user_id: userId,
            role_id: { in: rolesToRemove }
          }
        })
      }

      const rolesToAdd = role_ids.filter(
        (roleId) => !currentRoleIds.includes(roleId)
      )
      if (rolesToAdd.length > 0) {
        await prisma.user_roles.createMany({
          data: rolesToAdd.map((roleId) => ({
            user_id: userId,
            role_id: roleId
          }))
        })
      }
    }

    const { password: _, ...userWithoutPassword } = updatedUser
    return createResponse('Thành công', userWithoutPassword)
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = req.cookies.get('sessionId')?.value
  const { userAgent, ipAddress } = getRequestInfo(req)

  await prisma.users.update({
    where: { id: parseInt(params.id) },
    data: {
      is_verified: false,
      user_activity: {
        create: {
          action: 'USER_DELETE',
          description: 'Xóa tài khoản',
          ip_address: ipAddress,
          user_agent: userAgent,
          session_id: getCookie('session_id') ?? sessionId
        }
      }
    }
  })

  /* await prisma.user.delete({
    where: { id: parseInt(params.id) }
  }) */

  return createResponse('Thành công')
}
