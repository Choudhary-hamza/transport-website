import FlightCard from "@/components/all-flight/flightCard";
import styles from "./allFlight.module.css";
import { cookies } from "next/headers";
import { getFlightsForAdmin, getFlightsForDriver } from "@/lib/flight";
import { redirect } from "next/navigation";
export default async function allFlight() {
  const cookieStore = await cookies();
  const role = JSON.parse(cookieStore.get("role")?.value || "null");
  const userId = JSON.parse(cookieStore.get("userId")?.value || "null");

  let data = [];

  if (role === "driver") {
    data = (await getFlightsForDriver(userId)) || [];
  } else if (role === "admin") {
    data = (await getFlightsForAdmin()) || [];
  } else {
    redirect("/login");
  }

  return (
    <div className={styles.main_container}>
      <p className={styles.header}>جميع الحجوزات </p>
      <div className={styles.flex_container}>
        {data.length === 0 ? (
          <p className={styles.empty}>لا توجد رحلات بعد</p>
        ) : (
          data.map((dataEach, index) => (
            <FlightCard key={index} data={dataEach} />
          ))
        )}
      </div>
    </div>
  );
}
