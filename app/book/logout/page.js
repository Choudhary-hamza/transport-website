"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      const response = await fetch("/api/logout", { method: "GET" });
      if (response.ok) {
        router.push("/login"); // Use router.push for client-side navigation
      } else {
        console.error("Failed to log out");
      }
    }

    handleLogout();
  }, [router]);

  return <></>;
}
