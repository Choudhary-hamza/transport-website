import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(Request) {
  const cookieStore = cookies();
  cookieStore.delete("userId");
  cookieStore.delete("role");
  return NextResponse.json({ message: "Cookie deleted" }, { status: 200 });
}
