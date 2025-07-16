import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { driverId, vehicleId } = await req.json();

    if (!driverId || !vehicleId) {
      return NextResponse.json(
        { error: "driverId and vehicleId are required." },
        { status: 400 }
      );
    }

    const trip = await prisma.trip.create({
      data: {
        driverId,
        vehicleId,
      },
    });

    return NextResponse.json({ tripId: trip.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
