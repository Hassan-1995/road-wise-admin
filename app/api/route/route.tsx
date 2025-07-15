import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tripId, storeId } = await req.json();

    if (!tripId || !storeId) {
      return NextResponse.json(
        { error: "tripId and storeId are required." },
        { status: 400 }
      );
    }

    const route = await prisma.route.create({
      data: {
        tripId,
        storeId,
      },
    });

    return NextResponse.json(
      { message: "Route added successfully", route },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
