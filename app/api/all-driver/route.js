import { NextResponse } from "next/server";
import {
  getAllDriver,
  getDriverByNameOrCar,
  deleteDriver,
  updateDriver,
} from "@/lib/driver";
export async function POST(Request) {
  const { search } = await Request.json();
  const result = getDriverByNameOrCar(search);
  if (!result) {
    return NextResponse.json(
      { message: "there is no such data" },
      { status: 404 }
    );
  }
  return NextResponse.json({ result }, { status: 200 });
}
export async function GET(Request) {
  const result = getAllDriver();
  if (!result) {
    return NextResponse.json(
      { message: "no data is present" },
      { status: 404 }
    );
  }
  return NextResponse.json({ result }, { status: 200 });
}
export async function DELETE(Request) {
  const { id } = await Request.json();
  const result = deleteDriver(id);
  if (result) {
    return NextResponse.json({ message: "driver deleted" }, { status: 200 });
  }
  return NextResponse.json({ message: "driver not deleted" }, { status: 404 });
}
export async function PATCH(Request) {
  const {
    driver_id,
    name,
    nationality,
    mobile_number,
    residency_number,
    card_number,
    car_type,
    car_plate_number,
    password,
  } = await Request.json();
  const driver = updateDriver(
    driver_id,
    name,
    nationality,
    mobile_number,
    residency_number,
    card_number,
    car_type,
    car_plate_number,
    password
  );
  if (!driver) {
    return NextResponse.json(
      { message: "لم يتم تحديث السائق" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "تم تحديث البيانات بنجاح" },
    { status: 200 }
  );
}
