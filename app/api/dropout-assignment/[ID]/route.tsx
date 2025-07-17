import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

// this function gets number of dropout locations per trip
// here ID is actually tripID
export async function GET(
  req: NextRequest,
  { params }: { params: { ID: string } }
) {
  const { ID } = params;

  try {
    const dropoutAssignmentInfo = await prisma.dropoutAssignment.findMany({
      where: {
        tripId: parseInt(ID),
      },
    });
    if (!dropoutAssignmentInfo) {
      return NextResponse.json(
        { message: "Dropout-Assignment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(dropoutAssignmentInfo, { status: 200 });
  } catch (error) {
    console.error("Error fetching dropoutAssignmentInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
