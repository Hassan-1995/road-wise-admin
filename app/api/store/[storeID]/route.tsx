import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ storeID: string }> }
) {
  const { storeID } = await params;

  try {
    const storeInfo = await prisma.store.findUnique({
      where: {
        id: parseInt(storeID),
      },
    });
    if (!storeInfo) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }
    return NextResponse.json(storeInfo, { status: 200 });
  } catch (error) {
    console.error("Error fetching storeInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
