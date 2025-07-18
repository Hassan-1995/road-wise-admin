import { prisma } from "@/lib/client";
import { NextResponse, NextRequest } from "next/server";

// this function shows the trips with respect to driverID (each driver)
export async function GET(
  req: NextRequest,
  { params }: { params: { logID: string } }
) {
  const { logID } = params;

  try {
    const trip = await prisma.trip.findMany({
      where: {
        driverId: parseInt(logID),
      },
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
        // routes: {
        dropoutAssigns: {
          select: {
            storeId: true,
            store: {
              select: {
                storeName: true,
              },
            },
          },
        },

        // store: {
        //   select: {
        //     storeName: true,
        //     address: true,
        //   },
        // },
      },
    });

    if (!trip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(trip, { status: 200 });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
