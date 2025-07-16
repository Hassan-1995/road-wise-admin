import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { routeID: string } }
) {
  const { routeID } = params;

  try {
    const routeInfo = await prisma.route.findMany({
      where: {
        tripId: parseInt(routeID),
      },
    });
    if (!routeInfo) {
      return NextResponse.json({ message: "Route not found" }, { status: 404 });
    }
    return NextResponse.json(routeInfo, { status: 200 });
  } catch (error) {
    console.error("Error fetching routeInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
