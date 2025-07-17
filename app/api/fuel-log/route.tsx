import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const fuelLog = await prisma.fuelLog.findMany({
    include: {
      vehicle: {
        select: {
          makeModel: true,
        },
      },
      driver: {
        select: {
          userId: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(fuelLog);
}
