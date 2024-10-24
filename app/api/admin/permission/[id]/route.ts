import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const permissionId = Number(params.id);

  try {
    const permission = await prisma.permissions.findUnique({
      where: { id: permissionId },
    });

    if (!permission) {
      return createResponse("Không tìm thấy", null, 500);
    }

    return createResponse("Thành công", permission);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const permissionId = Number(params.id);

  try {
    const body = await req.json();
    const {
      name,
      icon,
      guard_name,
      parent_id,
      path,
      level,
      route_name,
      title_name,
      title_description,
      status,
    } = body;

    const updatedPermission = await prisma.permissions.update({
      where: { id: permissionId },
      data: {
        name,
        icon,
        guard_name,
        parent_id,
        path,
        level,
        route_name,
        title_name,
        title_description,
        status,
      },
    });

    return createResponse("Thành công", updatedPermission);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const permissionId = Number(params.id);

  try {
    await prisma.permissions.delete({
      where: { id: permissionId },
    });

    return createResponse("Thành công");
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
