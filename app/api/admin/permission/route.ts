import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;
    const permissions = await prisma.permissions.findMany({
      skip,
      take: limit,
    });
    const total = await prisma.permissions.count();
    return createResponse("Thành công", {
      permissions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total: total,
    });
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
