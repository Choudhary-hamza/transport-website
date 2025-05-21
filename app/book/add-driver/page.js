import PostForm from "@/components/add-driver/form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { findDriver, createDriver } from "@/lib/driver";
import { cookies } from "next/headers";
import NotFound from "../not-found";
import { uploadImage } from "@/lib/cloudinary";
export default async function addDriver() {
  const cookieStore = await cookies();
  if (!cookieStore.has("userId") || !cookieStore.has("role")) {
    redirect("/login");
  }
  const role = JSON.parse(cookieStore.get("role").value);
  if (role === "driver") {
    return <NotFound />;
  }
  async function submitHandler(prevState, formData) {
    "use server";
    const name = formData.get("name")?.toLowerCase();
    const nationality = formData.get("nationality")?.toLowerCase();
    const mobile_number = formData.get("phoneNumber")?.toLowerCase();
    const residency_number = formData.get("residencyNumber")?.toLowerCase();
    const card_number = formData.get("cardNumber")?.toLowerCase();
    const car_type = formData.get("carType")?.toLowerCase();
    const car_plate_number = formData.get("plateNumber")?.toLowerCase();
    const password = formData.get("password");
    const photo = formData.get("image");
    let errors = [];
    if (
      !name?.trim() ||
      !nationality?.trim() ||
      !mobile_number?.trim() ||
      !residency_number?.trim() ||
      !card_number?.trim() ||
      !car_type?.trim() ||
      !car_plate_number?.trim() ||
      !password?.trim() ||
      !photo
    ) {
      errors.push("Please fill in all fields.");
    }
    if (errors.length > 0) {
      return { errors };
    }
    const isDuplicated = findDriver(residency_number);
    if (isDuplicated) {
      errors.push("this driver is already registered");
    }
    if (errors.length > 0) {
      return { errors };
    }
    let image;
    try {
      image = await uploadImage(photo);
      console.log("image", image);
    } catch (error) {
      return { errors: ["error occuring while uploading image"] };
    }
    if (errors.length > 0) {
      return { errors };
    }
    try {
      await createDriver(
        name,
        nationality,
        mobile_number,
        residency_number,
        card_number,
        car_type,
        car_plate_number,
        password,
        image
      );
    } catch (error) {
      return { errors: ["please try again"] };
    }
    revalidatePath("/book/all-driver");
    redirect("/book/all-driver");
  }

  return <PostForm action={submitHandler} />;
}
