import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createResponse } from "@/lib/utils";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "default_secret";
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return createResponse(
                "Error",
                "Email hoặc mật khẩu không chính xác",
                401
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return createResponse(
                "Error",
                "Email hoặc mật khẩu không chính xác",
                401
            );
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            type_user: user.type_user
        }, SECRET_KEY, {
            expiresIn: "1h",
        });
        return createResponse("Success", { access_token: token, user }, 200);
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "Error registering user" },
            { status: 500 }
        );
    }
}
