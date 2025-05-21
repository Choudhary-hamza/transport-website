import { getSingleDriver } from "@/lib/driver";
import { NextResponse } from "next/server";

export async function POST(Request) {
  const { userId } = await Request.json();
  const user = getSingleDriver(userId);
  if (!user) {
    return NextResponse.json(
      { message: "Driver not found" },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json({ user }, { status: 200 });
}
