import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";
import { genOrderCode } from "@/utils/order";

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        seller: true,
        buyer: true,
        platform: true,
      },
    });
    return createResponse("Thành công", orders);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newOrder = await prisma.orders.create({
      data: {
        order_code: genOrderCode(),
        seller_id: body.seller_id,
        buyer_id: body.buyer_id,
        platformId: body.platformId,
        price: body.price,
        description: body.description,
        account_type: body.account_type,
        duration: body.duration,
        duration_type: body.duration_type,
        expiration_date: body.expiration_date,
        payment_status: body.payment_status,
        payment_date: body.payment_date,
        payment_due_date: body.payment_due_date,
        notes: body.notes,
      },
    });
    return createResponse("Thành công", newOrder);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
