import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET() {
  try {
    const platforms = await prisma.platforms.findMany();
    return createResponse("Thành công", platforms);
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
