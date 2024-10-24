import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET() {
  try {
    const shopAccounts = await prisma.shop_accounts.findMany({
      include: {
        platform: true,
      },
    });

    return createResponse("Thành công", shopAccounts);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platformId, username, password, email, price, isSold, farm } = body;

    const newShopAccount = await prisma.shop_accounts.create({
      data: {
        platformId,
        username,
        password,
        email,
        price,
        isSold,
        farm,
      },
    });

    return createResponse("Thành công", newShopAccount);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
