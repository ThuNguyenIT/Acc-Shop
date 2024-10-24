import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const shopAccountId = Number(params.id);

  try {
    const shopAccount = await prisma.shop_accounts.findUnique({
      where: { id: shopAccountId },
      include: {
        platform: true,
      },
    });

    if (!shopAccount) {
      return createResponse("Không tìm thấy tài khoản cửa hàng", null, 404);
    }

    return createResponse("Thành công", shopAccount);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const shopAccountId = Number(params.id);

  try {
    const body = await req.json();
    const { platformId, username, password, email, price, isSold, farm } = body;

    const updatedShopAccount = await prisma.shop_accounts.update({
      where: { id: shopAccountId },
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

    return createResponse("Thành công", updatedShopAccount);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const shopAccountId = Number(params.id);

  try {
    await prisma.shop_accounts.delete({
      where: { id: shopAccountId },
    });

    return createResponse("Thành công");
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
