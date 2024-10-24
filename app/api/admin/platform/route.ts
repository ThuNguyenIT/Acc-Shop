import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;
    const platforms = await prisma.platforms.findMany({
      skip,
      take: limit,
    });
    const total = await prisma.platforms.count();

    return createResponse("Thành công", {
      platforms,
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
      source,
      password,
      mail_recovery,
      country,
      origin_price,
      price,
      percent_discount,
      final_price,
    } = body;

    const newPlatform = await prisma.platforms.create({
      data: {
        name,
        source,
        password,
        mail_recovery,
        country,
        origin_price,
        price,
        percent_discount,
        final_price,
      },
    });

    return createResponse("Thành công", newPlatform);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
