import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { driverID: string } }
) {
  const { driverID } = params;

  try {
    const driverInfo = await prisma.driver.findUnique({
      where: {
        id: parseInt(driverID),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!driverInfo) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(driverInfo, { status: 200 });
  } catch (error) {
    console.error("Error fetching driverInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
