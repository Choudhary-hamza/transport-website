import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file) {
  
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUrl, {
    folder: "your-folder",
  });

  return result.secure_url;
}

export async function uploadNewImage(photo) {
  // photo should be a base64 string or data URL
  // If it's a base64 string, prepend the data URL header
  let dataUrl = photo;
  if (!photo.startsWith("data:")) {
    dataUrl = `data:image/jpeg;base64,${photo}`;
  }
  const result = await cloudinary.uploader.upload(dataUrl, {
    folder: "your-folder",
  });

  return result.secure_url;
}
