import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { createResponse, getErrorMessage, getRequestInfo } from '@/lib/utils'

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        is_verified: true,
        status: true,
        full_name: true,
        mobile: true,
        address: true,
        birthday: true,
        user_point: {
          select: {
            point: true,
            bonus: true
          }
        },
        user_roles: {
          select: {
            role: {
              select: {
                role: true
              }
            }
          }
        }
        /* user_activity: true,
        author: true,
        comments: true,
        ratings: true,
        favorites: true,
        point_transaction: true,
        reading_progress: true,
        view_user: true,
        notification: true,
        bookmark: true,
        audit_log: true,
        report: true */
      }
    })

    return createResponse('Thành công', users)
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      username,
      email,
      password,
      full_name,
      mobile,
      address,
      birthday,
      role_ids
    } = await request.json()

    const user = await prisma.users.findFirst({
      where: {
        OR: [{ username: username }, { email: email }]
      }
    })

    if (user) {
      return createResponse('Username hoặc email đã tồn tại', null, 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const parsedBirthday = birthday ? new Date(birthday) : null
    const { userAgent, ipAddress } = getRequestInfo(request)

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        full_name,
        mobile,
        address,
        birthday: parsedBirthday,
        is_verified: false,
        user_point: {
          create: {
            bonus: 0,
            point: 0
          }
        },
        user_activities: {
          create: {
            action: 'USER_CREATE',
            description: 'Tạo mới tài khoản',
            ip_address: ipAddress,
            user_agent: userAgent,
            session_id: ''
          }
        }
      }
    })

    if (Array.isArray(role_ids) && role_ids.length > 0) {
      await prisma.user_roles.createMany({
        data: role_ids.map((roleId) => ({
          user_id: newUser.id,
          role_id: roleId
        }))
      })
    }

    const { password: _, ...userWithoutPassword } = newUser
    return createResponse('Thành công', userWithoutPassword)
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}
