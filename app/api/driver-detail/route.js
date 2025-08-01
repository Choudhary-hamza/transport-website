import { getSingleDriver } from "@/lib/driver";
import {getCompanyQr} from "@/lib/admin";
import { NextResponse } from "next/server";
export async function POST(Request) {
  const { id } = await Request.json();
  const result =await getSingleDriver(id);
  if (!result) {
    return NextResponse.json(
      { message: "no data is present" },
      { status: 404 }
    );
  }
   const qr=await getCompanyQr();

    const updatedResult = {
    ...result,
    qr,
  };
  return NextResponse.json({ result :updatedResult}, { status: 200 });
}
