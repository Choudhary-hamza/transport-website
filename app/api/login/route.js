import { checkPassword } from "@/lib/admin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkUserCredentials } from "@/lib/driver";
export async function POST(Request) {
  const { name, password } = await Request.json();
  if (!name || !password || name.trim() == "" || password.trim() == "") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const cookieStore = await cookies();
  if (cookieStore.has("userId")) {
    cookieStore.delete("userId");
  }
  if (cookieStore.has("role")) {
    cookieStore.delete("role");
  }
  if (name === "admin") {
    const response = checkPassword(password);
    if (response) {
      const role = "admin";

      cookieStore.set("userId", JSON.stringify(response));
      cookieStore.set("role", JSON.stringify(role));
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const response = await checkUserCredentials(name, password);
  console.log(response);
  if (response) {
    const role = "driver";
    cookieStore.set("userId", JSON.stringify(response));
    cookieStore.set("role", JSON.stringify(role));
    return NextResponse.json({ status: 200 });
  }
  return NextResponse.json({ error: "Missing fields" }, { status: 400 });
}
