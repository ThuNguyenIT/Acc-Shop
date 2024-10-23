import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { RoleName } from "@/constants/enum";

export async function GET() {
  const roles = await prisma.roles.findMany();
  return createResponse("Thành công", roles);
}

export async function POST() {
  try {
    const rolesToCreate = Object.keys(RoleName)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        name: key,
        guard_name: "web",
        description: RoleName[key as keyof typeof RoleName],
      }));

    const existingRoles = await prisma.roles.findMany({
      where: {
        name: { in: rolesToCreate.map((role) => role.name) },
      },
      select: { name: true },
    });

    const existingRoleNames = existingRoles.map((role) => role.name);
    const filteredRolesToCreate = rolesToCreate.filter(
      (role) => !existingRoleNames.includes(role.name)
    );

    /* let createdRoles;
    if (filteredRolesToCreate.length > 0) {
      createdRoles = await prisma.roles.createMany({
        data: filteredRolesToCreate,
        skipDuplicates: true,
      });
    } */

    let createdRoles = [];
    for (const role of rolesToCreate) {
      const createdRole = await prisma.roles.upsert({
        where: { name: role.name },
        update: role, // Cập nhật role nếu đã tồn tại
        create: role, // Tạo mới nếu không tồn tại
      });
      createdRoles.push(createdRole);
    }

    return createResponse("Thành công", createdRoles);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
