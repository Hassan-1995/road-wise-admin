import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { driverId, vehicleId, storeId } = await req.json();

//     if (!driverId || !vehicleId || !storeId) {
//       return NextResponse.json(
//         { message: "driverId, vehicleId and storeId are required." },
//         { status: 400 }
//       );
//     }

//     const result = await prisma.$transaction(async (tx) => {
//       // Step 1: Create Trip
//       const trip = await tx.trip.create({
//         data: {
//           driverId,
//           vehicleId,
//         },
//       });

//       // Step 2: Create Route using returned trip.id
//       const route = await tx.route.create({
//         data: {
//           tripId: trip.id,
//           storeId,
//         },
//       });

//       return { trip, route };
//     });

//     return NextResponse.json(
//       { message: "Trip and Route created successfully.", data: result },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating Trip and Route:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

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
