import { prisma } from '@/lib/prisma'
import { createResponse, getErrorMessage } from '@/lib/utils'
import { RoleName } from '@/constants/enum'

export async function GET() {
  const roles = await prisma.roles.findMany()
  return createResponse('Thành công', roles)
}

export async function POST() {
  try {
    const rolesToCreate = Object.keys(RoleName)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        role: key,
        description: RoleName[key as keyof typeof RoleName]
      }))

    const createdRoles = await prisma.roles.createMany({
      data: rolesToCreate,
      skipDuplicates: true
    })

    return createResponse('Thành công', createdRoles)
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500)
  }
}
