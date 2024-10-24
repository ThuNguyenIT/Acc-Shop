import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET() {
  try {
    const permissions = await prisma.permissions.findMany();
    return createResponse("Thành công", permissions);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function POST(req: NextRequest) {
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

    const newPermission = await prisma.permissions.create({
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

    return createResponse("Thành công", newPermission);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
