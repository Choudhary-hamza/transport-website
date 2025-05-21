import { getSingleDriver } from "@/lib/driver";
import { getFlightById } from "@/lib/flight";
import { getGuestsByFlightId } from "@/lib/guest";
import { NextResponse } from "next/server";

export async function POST(Request) {
  const body = await Request.json();
  const { type } = body;
  if (type === "flight") {
    const { flightId } = body;
    const data = await getFlightById(flightId);
    if (!data) {
      return NextResponse.json(
        { message: "لا يوجد سائق بهذا الاسم" },
        { status: 404 }
      );
    }
    return NextResponse.json({ result: data }, { status: 200 });
  }
  if (type === "driver") {
    const { driverId } = body;
    const data = await getSingleDriver(driverId);
    if (!data) {
      return NextResponse.json(
        { message: "لا توجد رحلة كهذ" },
        { status: 404 }
      );
    }
    return NextResponse.json({ result: data }, { status: 200 });
  }
  if (type === "guest") {
    const { flightId } = body;
    const data = await getGuestsByFlightId(flightId);
    if (!data) {
      return NextResponse.json(
        { message: "لا يوجد ضيوف كهؤلا" },
        { status: 404 }
      );
    }
    return NextResponse.json({ result: data }, { status: 200 });
  }
}
