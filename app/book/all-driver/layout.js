import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import NotFound from "../not-found";
export const metadata = {
  title: "Dashboard",
  description: "Admin and driver dashboard",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  if (!cookieStore.has("userId") || !cookieStore.has("role")) {
    redirect("/login");
  }
  const role = JSON.parse(cookieStore.get("role").value);
  if (role === "driver") {
    return <NotFound />;
  } else if (role === "admin") {
    return children;
  }
}
