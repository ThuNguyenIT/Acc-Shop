import { PrismaClient } from "@prisma/client";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req: NextRequest) {
  try {
    const { id, email, mobile, full_name, status, link } = await req.json();
    const existingCustomer = await prisma.users.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return createResponse("Khách hàng không tồn tại!", null, 404);
    }
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        email,
        mobile,
        full_name,
        status,
        // social_network: link as Prisma.JsonValue,
      },
    });

    return createResponse("Success", updatedUser, 200);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 400);
  }
}
