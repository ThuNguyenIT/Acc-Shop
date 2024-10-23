import { PrismaClient } from "@prisma/client";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  try {
    const id = params.employeeId;
    if (!id || Array.isArray(id)) {
      return createResponse("ID không hợp lệ", null, 400);
    }

    // Tìm nhân viên theo id
    const employee = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    return createResponse("Success", employee);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
