import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { vehicleID: string } }
) {
  const { vehicleID } = params;
  try {
    const vehicleInfo = await prisma.vehicle.findUnique({
      where: {
        id: parseInt(vehicleID),
      },
    });
    if (!vehicleInfo) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(vehicleInfo, { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicleInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
