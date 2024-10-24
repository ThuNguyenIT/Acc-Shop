import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResponse, getErrorMessage } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);

  try {
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
      include: {
        seller: true,
        buyer: true,
        platform: true,
      },
    });

    if (!order) {
      return createResponse('Không tìm thấy đơn hàng', null, 404);
    }

    return createResponse("Thành công", order);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);

  try {
    const body = await req.json();
    const {
      order_code,
      seller_id,
      buyer_id,
      platformId,
      price,
      description,
      account_type,
      duration,
      duration_type,
      expiration_date,
      payment_status,
      payment_date,
      payment_due_date,
      notes,
    } = body;

    const updatedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: {
        order_code,
        seller_id,
        buyer_id,
        platformId,
        price,
        description,
        account_type,
        duration,
        duration_type,
        expiration_date,
        payment_status,
        payment_date,
        payment_due_date,
        notes,
      },
    });

    return createResponse("Thành công", updatedOrder);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);

  try {
    await prisma.orders.delete({
      where: { id: orderId },
    });

    return createResponse("Thành công");
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
