import { uploadNewImage } from "@/lib/cloudinary";
import { updateImage } from "@/lib/driver";
import { NextResponse } from "next/server";

export async function POST(Request) {
  const { userId, photo } = await Request.json();
  const isUploaded = await uploadNewImage(photo);
  if (!isUploaded) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
  const isSaved = await updateImage(userId, isUploaded);
  if (!isSaved) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
  return NextResponse.json({ data: isSaved }, { status: 200 });
}
