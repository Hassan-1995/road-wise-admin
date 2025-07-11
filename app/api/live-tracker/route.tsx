import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const live_trackers = await prisma.liveTracker.findMany({
    include: {
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
      vehicle: {
        select: {
          makeModel: true,
          registrationNumber: true,
        },
      },
    },
  });

  return NextResponse.json(live_trackers);
}
