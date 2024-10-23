import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage, getRequestInfo } from "@/lib/utils";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        is_verified: true,
        status: true,
        full_name: true,
        mobile: true,
        /* user_activity: true,
        author: true,
        comments: true,
        ratings: true,
        favorites: true,
        point_transaction: true,
        reading_progress: true,
        view_user: true,
        notification: true,
        bookmark: true,
        audit_log: true,
        report: true */
      },
    });

    return createResponse("Thành công", users);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      parent_id,
      type_user,
      email,
      mobile,
      password,
      is_verified,
      status,
      full_name,
      social_network,
      role_ids,
    } = await request.json();

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: email }],
      },
    });

    if (existingUser) {
      return createResponse("Email đã tồn tại", null, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { userAgent, ipAddress } = getRequestInfo(request);

    const userData: any = {
      type_user: type_user ?? 5,
      email,
      mobile: mobile ?? null,
      password: hashedPassword,
      is_verified: is_verified ?? true,
      status: status ?? true,
      full_name,
      social_network: social_network ?? null,
      user_activities: {
        create: {
          action: "USER_CREATE",
          description: "Tạo mới tài khoản",
          ip_address: ipAddress,
          user_agent: userAgent,
          session_id: "",
        },
      },
    };

    if (parent_id) {
      userData.parent_id = parent_id;
    }

    const newUser = await prisma.users.create({
      data: userData,
    });

    if (Array.isArray(role_ids) && role_ids.length > 0) {
      await prisma.model_has_roles.createMany({
        data: role_ids.map((roleId) => ({
          user_id: newUser.id,
          role_id: roleId,
        })),
      });
    }

    const { password: _, ...userWithoutPassword } = newUser;
    return createResponse("Thành công", userWithoutPassword);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
