import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const vehilces = await prisma.vehicle.findMany();
  return NextResponse.json(vehilces);
}
