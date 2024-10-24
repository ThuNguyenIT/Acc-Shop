import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createResponse, getErrorMessage } from '@/lib/utils';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const platformId = Number(params.id);

  try {
    const platform = await prisma.platforms.findUnique({
      where: { id: platformId },
    });

    if (!platform) {
      return createResponse('Không tìm thấy nền tảng', null, 404);
    }

    return createResponse("Thành công", platform);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const platformId = Number(params.id);

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

    const updatedPlatform = await prisma.platforms.update({
      where: { id: platformId },
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

    return createResponse("Thành công", updatedPlatform);
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const platformId = Number(params.id);

  try {
    await prisma.platforms.delete({
      where: { id: platformId },
    });

    return createResponse("Thành công");
  } catch (error) {
    return createResponse(getErrorMessage(error), null, 500);
  }
}
