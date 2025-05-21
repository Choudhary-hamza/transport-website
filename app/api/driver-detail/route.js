import { getSingleDriver } from "@/lib/driver";
import { NextResponse } from "next/server";
export async function POST(Request) {
  const { id } = await Request.json();
  const result = getSingleDriver(id);
  if (!result) {
    return NextResponse.json(
      { message: "no data is present" },
      { status: 404 }
    );
  }
  return NextResponse.json({ result }, { status: 200 });
}
