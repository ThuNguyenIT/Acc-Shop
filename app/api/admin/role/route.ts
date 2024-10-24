import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { RoleName } from "@/constants/enum";

export async function GET() {
  try {
    const roles = await prisma.roles.findMany({
      include: {
        role_permissions: true,
      }
    });

    const permissions = await prisma.permissions.findMany();
    
    return createResponse("Thành công", { roles, permissions });
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
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

    let createdRoles = [];
    for (const role of rolesToCreate) {
      const createdRole = await prisma.roles.upsert({
        where: { name: role.name },
        update: role,
        create: role,
      });
      createdRoles.push(createdRole);
    }

    return createResponse("Thành công", createdRoles);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
