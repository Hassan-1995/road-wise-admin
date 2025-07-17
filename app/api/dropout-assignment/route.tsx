import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tripId, driverId, storeId } = await req.json();

    if (!tripId || !driverId || !storeId) {
      return NextResponse.json(
        { error: "tripId, driverId and storeId are required." },
        { status: 400 }
      );
    }

    const route = await prisma.dropoutAssignment.create({
      data: {
        tripId,
        driverId,
        storeId,
      },
    });

    return NextResponse.json(
      { message: "Dropout added successfully", route },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding dropout:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
