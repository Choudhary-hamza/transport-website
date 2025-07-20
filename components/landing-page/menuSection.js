'use client';

import Link from "next/link";
import styles from "./menuSection.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MenuSection() {
  const pathname = usePathname() || "/";
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  console.log("Normalized path name:", normalizedPath);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "cars", href: "#cars" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.image}>
          <Image src="/logo.png" alt="company logo" fill />
        </div>
      </div>

      <ul className={styles.navLinks}>
        {navItems.map((item) => {
          const isActive = normalizedPath === item.href;
          return (
            <li key={item.href} className={isActive ? styles.active : ""}>
              <Link href={item.href} className={isActive ? styles.activeLink : ""}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
