import { PrismaClient } from "@prisma/client";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: { customerId: string } }
) {
    try {
        const id = params.customerId;
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  try {
    const id = params.customerId;
    const deletedUser = await prisma.users.delete({
      where: { id: Number(id) },
    });
    return createResponse("Success", deletedUser, 200);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 400);
  }
}
