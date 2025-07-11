import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
  return NextResponse.json(drivers);
}
