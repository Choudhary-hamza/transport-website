import styles from "./flights.module.css";
import Link from "next/link";
export default function FlightCard({ data }) {
  return (
    <>
      <div className={styles.card_container}>
        <p className={styles.header}>معلومات الرحلة</p>
        <hr className={styles.hr} />
        <p className={styles.user_data} dir="rtl">
          رحلة رقم :<span>{data?.flight_numbers}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          اسم السائق :<span>{data?.driver_name}</span>
        </p>
        <hr className={styles.hr} />
        <p className={styles.user_data} dir="rtl">
          يوم الرحلة : <span>{data?.trip_day}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          تاريخ الرحلة : <span>{data?.trip_date}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          السيارة :<span>{data?.car_type}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          اسم الضيف الاول :<span>{data?.guest_name}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          من :<span>{data?.from_location}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          الى :<span>{data?.to_location}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          سعر الرحلة : <span>{data?.flight_price}</span>
        </p>
        <p className={styles.user_data} dir="rtl">
          رقم صاحب الحجز:<span>{data?.guest_phonenumber}</span>
        </p>
        <div className={styles.link_container}>
          <Link
            href={`/flight-card?flightId=${data?.flight_id}`}
            className={`${styles.link} ${styles.link2}`}
          >
            {" "}
            طباعة{" "}
          </Link>
          <Link
            href={`/book/all-flight/${data?.flight_id}`}
            className={`${styles.link} ${styles.link3}`}
          >
            {" "}
            تعديل{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
