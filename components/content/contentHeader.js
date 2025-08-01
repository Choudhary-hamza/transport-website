import styles from "./layout.module.css";
import Image from "next/image";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";
import MenuLink from "./links";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function ContentHeader() {
  const cookieStore = await cookies();
  if (!cookieStore.has("userId") || !cookieStore.has("role")) {
    redirect("/login");
  }
  const role = JSON.parse(cookieStore.get("role").value);
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.header_image}>
          <Image src="/logo.png" alt="company logo" fill></Image>
        </Link>
        <div className={styles.profile}>
          <p>ملف شخصي</p>
          <div className={styles.icon} rel="">
            <Link href="/book/profile">
              <i className={`ri-account-circle-line ${styles.remixicon}`}></i>
            </Link>
          </div>
        </div>
      </header>
      <menu className={styles.menu_container}>
        {role === "admin" && (
          <ul className={styles.list}>
            <MenuLink
              href={"add-driver"}
              content={"سائق جديد"}
              iconClass={"ri-user-add-fill"}
            ></MenuLink>
            <MenuLink
              href={"all-driver"}
              content={"جميع السائقين"}
              iconClass={"ri-user-fill"}
            ></MenuLink>
            <MenuLink
              href={"all-flight"}
              content={"جميع الرحلات الجوية"}
              iconClass={"ri-taxi-fill"}
            ></MenuLink>
            <MenuLink
              href={"logout"}
              content={"تسجيل الخروج"}
              iconClass={"ri-logout-box-line"}
            ></MenuLink>
          </ul>
        )}
        {role === "driver" && (
          <ul className={styles.list}>
            <MenuLink
              href={"all-flight"}
              content={"جميع الرحلات الجوية"}
              iconClass={"ri-taxi-fill"}
            ></MenuLink>
            <MenuLink
              href={"add-flight"}
              content={"إنشاء رحلة جوية "}
              iconClass={"ri-car-fill"}
            ></MenuLink>
            <MenuLink
              href={"logout"}
              content={"تسجيل الخروج"}
              iconClass={"ri-logout-box-line"}
            ></MenuLink>
          </ul>
        )}
      </menu>
    </>
  );
}
