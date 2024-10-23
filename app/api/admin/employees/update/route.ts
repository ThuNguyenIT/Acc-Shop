import { PrismaClient } from "@prisma/client";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req: NextRequest) {
    try {
        const { id, email, mobile, full_name, status } = await req.json();
        const existingUser = await prisma.users.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return createResponse("Nhân viên không tồn tại!", null, 404);
        }
        const updatedUser = await prisma.users.update({
            where: { id },
            data: {
                email,
                mobile,
                full_name,
                status,
            },
        });

        return createResponse("Success", updatedUser, 200);
    } catch (error) {
        return createResponse(getErrorMessage(error), null, 400);
    }
}