import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminProfile from "@/components/profile/AdminProfile";
import DriverProfile from "@/components/profile/driverProfile";
export default async function Profile() {
  const cookieStore = await cookies();
  const role = JSON.parse(cookieStore.get("role")?.value || "null");
  if (!role) {
    redirect("/login");
  }
  const userId = JSON.parse(cookieStore.get("userId")?.value || "null");

  return (
    <>
      {role === "admin" ? (
        <AdminProfile />
      ) : (
        <DriverProfile userId={userId}></DriverProfile>
      )}
    </>
  );
}
