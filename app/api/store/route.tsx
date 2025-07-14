import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const stores = await prisma.store.findMany();
  return NextResponse.json(stores);
}
