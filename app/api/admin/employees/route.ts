import { PrismaClient } from "@prisma/client";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { PASSWORD_DEFAULT } from "@/constants/common";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, mobile, full_name, status } = await req.json();
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return createResponse("Email đã tồn tại!", null, 400);
        }
        const hashedPassword = await bcrypt.hash(PASSWORD_DEFAULT, 10);
        // Thêm mới nhân viên
        const newUser = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                mobile,
                full_name,
                type_user: 3,
                status,
            },
        });
        return createResponse("Success", newUser, 200);
    } catch (error) {
        return createResponse(getErrorMessage(error), null, 400);
    }
}
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const searchTerm = searchParams.get("search") || "";

        const pageSize = limit;
        const skip = (page - 1) * pageSize;
        const employees = await prisma.users.findMany({
            where: {
                type_user: 3,
                full_name: {
                    contains: searchTerm,
                },
            },
            select: {
                id: true,
                full_name: true,
                email: true,
                mobile: true,
                status: true,
                created_at: true,
            },
            orderBy: {
                created_at: "desc",
            },
            skip,
            take: pageSize,
        });
        const totalEmployee = await prisma.users.count({
            where: { type_user: 3 },
        });
        return createResponse("Success", {
            employees,
            currentPage: page,
            totalPages: Math.ceil(totalEmployee / pageSize),
            totalEmployee: totalEmployee,
        });
    } catch (error) {
        return createResponse(getErrorMessage(error), null, 500);
    }
}
