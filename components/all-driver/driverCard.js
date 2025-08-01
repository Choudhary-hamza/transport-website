"use client";
import styles from "./allDrivers.module.css";
import Image from "next/image";
import Link from "next/link";
export default function DriverCard({ eachData, index, deleteDriver }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.image}>
        <Image src={eachData.photo} alt="صورة السائق" fill></Image>
      </div>
      <div className={styles.logo_container}>
        <div className={styles.company_barcode}>
          <Image src={eachData.qr} alt="الرمز الشريطي للشركة" fill></Image>
        </div>
        <p className={styles.driver_card}> بطاقة السائق </p>
      </div>
      <br></br>
      <p className={styles.user_data} dir="rtl">
        اسم السائق :<span>{eachData.name}</span>
      </p>
      <p className={styles.user_data} dir="rtl">
        رقم الاقامة: <span>{eachData.residency_number}</span>
      </p>
      <p className={styles.user_data} dir="rtl">
        رقم بطاقة السائق :<span>{eachData.card_number}</span>
      </p>
      <p className={styles.user_data} dir="rtl">
        الجنسية :<span>{eachData.nationality}</span>
      </p>
      <p className={styles.user_data} dir="rtl">
        سيارة السائق :<span>{eachData.car_type}</span>
      </p>
      <p className={styles.user_data} dir="rtl">
        رقم اللوحة :<span>{eachData.car_plate_number}</span>
      </p>
      <p className={styles.user_data} dir="rtl">
        كلمة السر للدخول :<span>{eachData.password}</span>
      </p>

      <div className={styles.link_container}>
        <button
          className={`${styles.link} ${styles.link1}`}
          onClick={() => deleteDriver(index, eachData.driver_id)}
        >
          {" "}
          حذف{" "}
        </button>
        <Link
          href={`/driver-card?driverId=${eachData.driver_id}`}
          className={`${styles.link} ${styles.link2}`}
        >
          {" "}
          طباعة{" "}
        </Link>
        <Link
          href={`/book/all-driver/${eachData.driver_id}`}
          className={`${styles.link} ${styles.link3}`}
        >
          {" "}
          تعديل{" "}
        </Link>
      </div>
    </div>
  );
}
