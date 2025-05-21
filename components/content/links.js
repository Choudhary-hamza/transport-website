"use client";
import Link from "next/link";
import styles from "./layout.module.css";
import { usePathname } from "next/navigation";

export default function MenuLink({ href, content, iconClass }) {
  const pathName = usePathname();
  const normalizedPath = pathName.replace(/\/$/, "");
  const fullHref = `/book${href ? `/${href}` : ""}`;

  const isActive = normalizedPath === fullHref;
  return (
    <li className={isActive ? styles.active : ""}>
      <Link href={`/book/${href}`} className={isActive ? styles.active : ""}>
        <div className={styles.iconsContainer}>
          <i className={`${iconClass} ${styles.remixicons}`}></i>
        </div>
        <p className={styles.content}>{content}</p>
      </Link>
    </li>
  );
}
