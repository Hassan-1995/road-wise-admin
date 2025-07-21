// import { prisma } from "@/lib/client";
// import { NextRequest, NextResponse } from "next/server";

// // this function gets number of dropout locations per trip
// // here ID is actually tripID
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { ID: string } }
// ) {
//   const { ID } = params;

//   try {
//     const dropoutAssignmentInfo = await prisma.dropoutAssignment.findMany({
//       where: {
//         tripId: parseInt(ID),
//       },
//       include: {
//         store: {
//           select: {
//             storeName: true,
//             latitude: true,
//             longitude: true,
//           },
//         },
//       },
//     });
//     if (!dropoutAssignmentInfo) {
//       return NextResponse.json(
//         { message: "Dropout-Assignment not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(dropoutAssignmentInfo, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching dropoutAssignmentInfo:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ID: string }> }
) {
  const { ID } = await params;

  try {
    const dropoutAssignmentInfo = await prisma.dropoutAssignment.findMany({
      where: { tripId: parseInt(ID) },
      include: {
        store: {
          select: { storeName: true, latitude: true, longitude: true },
        },
      },
    });

    if (!dropoutAssignmentInfo) {
      return new NextResponse(
        JSON.stringify({ message: "Dropout-Assignment not found" }),
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    return new NextResponse(JSON.stringify(dropoutAssignmentInfo), {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Error fetching dropoutAssignmentInfo:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
