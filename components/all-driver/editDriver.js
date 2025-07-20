"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./editDriver.module.css";
import { useRouter } from "next/navigation";

export default function EditDriver({ data }) {
  const router = useRouter();
  const [isUpdated, setUpdation] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef();
  const nationalityRef = useRef();
  const phoneRef = useRef();
  const resNumRef = useRef();
  const cardNumberRef = useRef();
  const carRef = useRef();
  const plateNumberRef = useRef();
  const passwordRef = useRef();
  async function submitHandler(e) {
    setError(false);
    e.preventDefault();
    const name = nameRef.current.value;
    const nationality = nationalityRef.current.value;
    const mobile_number = phoneRef.current.value;
    const residency_number = resNumRef.current.value;
    const card_number = cardNumberRef.current.value;
    const car_type = carRef.current.value;
    const car_plate_number = plateNumberRef.current.value;
    const password = passwordRef.current.value;
    if (
      !name?.trim() ||
      !nationality?.trim() ||
      !mobile_number?.trim() ||
      !residency_number?.trim() ||
      !card_number?.trim() ||
      !car_type?.trim() ||
      !car_plate_number?.trim() ||
      !password?.trim()
    ) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }
    const isSame =
      name === data.name &&
      nationality === data.nationality &&
      mobile_number === data.mobile_number &&
      residency_number === data.residency_number &&
      card_number === data.card_number &&
      car_type === data.car_type &&
      car_plate_number === data.car_plate_number &&
      password === data.password;

    if (isSame) {
      setUpdation(true);
      router.push("/book/all-driver");
    }
    const response = await fetch("/api/all-driver", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver_id: data.driver_id,
        name,
        nationality,
        mobile_number,
        residency_number,
        card_number,
        car_type,
        car_plate_number,
        password,
      }),
    });
    if (response.ok) {
      // Check if response is OK (status 200-299)
      const responseData = await response.json(); // Only parse JSON if response is valid
      if (response.status === 200) {
        setUpdation(true);
        router.push("/book/all-driver");
      } else if (response.status === 404) {
        setError(responseData.message);
      }
    } else {
      setError("حدث خطأ أثناء التحديث"); // "An error occurred during update"
    }
  }
  useEffect(() => {
    if (isUpdated) {
      const timer = setTimeout(() => {
        setUpdation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdated]);
  return (
    <>
      {isUpdated ? (
        <div className={styles.message}>تم تحديث البيانات بنجاح</div>
      ) : (
        ""
      )}
      <p className={styles.heading}>أدخل معلومات السائقين الجدد</p>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={submitHandler}>
          <input
            className={styles.inputField}
            required
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            defaultValue={data.name}
            placeholder="اسم السائق"
          />
          <input
            className={styles.inputField}
            required
            ref={nationalityRef}
            type="text"
            name="nationality"
            id="nationality"
            defaultValue={data.nationality}
            placeholder="الجنسية"
          />
          <input
            className={styles.inputField}
            required
            ref={phoneRef}
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={data.mobile_number}
            placeholder="رقم الجوال"
          />
          <input
            className={styles.inputField}
            required
            ref={resNumRef}
            type="text"
            name="residencyNumber"
            id="residencyNumber"
            defaultValue={data.residency_number}
            placeholder="رقم الاقامة"
          />
          <input
            className={styles.inputField}
            required
            ref={cardNumberRef}
            type="text"
            name="cardNumber"
            id="cardNumber"
            defaultValue={data.card_number}
            placeholder="رقم البطاقة"
          />
          <input
            className={styles.inputField}
            required
            ref={carRef}
            type="text"
            name="carType"
            id="carType"
            defaultValue={data.car_type}
            placeholder="نوع السيارة"
          />
          <input
            className={styles.inputField}
            required
            ref={plateNumberRef}
            type="text"
            name="plateNumber"
            id="plateNumber"
            defaultValue={data.car_plate_number}
            placeholder="رقم لوحة السيارة"
          />
          <input
            className={styles.inputField}
            required
            ref={passwordRef}
            type="text"
            name="password"
            id="password"
            defaultValue={data.password}
            placeholder="كلمة السر للدخول"
          />
          <button type="submit" className={styles.submit}>
            Edit
          </button>
          {error !== "" ? (
            <div className={styles.errorContainer}>{error}</div>
          ) : (
            ""
          )}
        </form>
      </main>
    </>
  );
}
