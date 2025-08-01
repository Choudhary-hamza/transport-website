import { uploadNewImage } from "@/lib/cloudinary";
import { updateQR } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function POST(Request) {
  const {  qr } = await Request.json();
  const isUploaded = await uploadNewImage(qr);
  if (!isUploaded) {
    return NextResponse.json({ message: "error while savong image in cloudinary" }, { status: 500 });
  }
  const isSaved = await updateQR(isUploaded);
  if (!isSaved) {
    return NextResponse.json({ message: "error saving qr in the database" }, { status: 500 });
  }
  return NextResponse.json({ data: isSaved }, { status: 200 });
}