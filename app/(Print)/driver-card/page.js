"use client";
import styles from "./driverCard.module.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Driverdetails() {
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState(null);
  const searchParams = useSearchParams();
  const driverId = searchParams.get("driverId");
  useEffect(() => {
    if (!driverId) {
      setNotFound(true);
      return;
    }
    async function getDriverDetails() {
      const response = await fetch("/api/driver-detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: driverId }),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        setData(responseData.result);
      } else {
        setNotFound(true);
      }
    }
    getDriverDetails();
  }, []);
  function handlePrint() {
    window.print();
  }
  return notFound ? (
    <div className={styles.error}>لا يوجد سائق كهذا</div>
  ) : (
    <>
      <header className={styles.header}>
        <div className={styles.header_image}>
          <Image src="/logo.png" alt="company logo" fill />
        </div>
        <div className={styles.header_name} dir="rtl">
          بطاقة السائق
        </div>
        <div className={styles.header_name} dir="rtl">
          شركة الناقل العالمي المحدودة
        </div>
      </header>
      <div className={styles.identification}>
        <p className={styles.register} dir="rtl">
          السجل التجاري : <b>4031299076</b>
        </p>
        <p className={styles.register} dir="rtl">
          ترخيص النقل المتخصص : <b>35/00003211</b>
        </p>
      </div>
      <hr className={styles.hrLine} />
      <div className={styles.information}>
        <div className={styles.pictures}>
        {data?.photo && data.photo.trim() !== "" ? (
            <div className={styles.driver_photo}>
              <Image src={data.photo} alt="driver photo" fill />
            </div>
        ) : null}

        <div className={styles.barcodes}>
          {data?.qr && <div className={styles.company_barcode}>
            <Image src={data.qr} alt="company logo" fill />
          </div>}
          <div className={styles.company_stamp}>
            <Image src="/signature.png" alt="company logo" fill />
          </div>
        </div>
        </div>
        <div className={styles.driverInfo}>
          <div className={styles.userInfo}>
            <p className={styles.userRegister} dir="rtl">
              اسم السائق : <span>{data?.name}</span>
            </p>
          </div>
          <hr className={styles.infoLine} />
          <div className={styles.userInfo}>
            <p className={styles.userRegister} dir="rtl">
              رقم الإقامة/الهوية : <span>{data?.residency_number}</span>
            </p>
          </div>
          <hr className={styles.infoLine} />
          <div className={styles.userInfo}>
            <p className={styles.userRegister} dir="rtl">
              رقم بطاقة السائق : <span>{data?.card_number}</span>
            </p>
          </div>
          <hr className={styles.infoLine} />
          <div className={styles.userInfo}>
            <p className={styles.userRegister} dir="rtl">
              الجنسية :<span>{data?.nationality}</span>
            </p>
          </div>
          <hr className={styles.infoLine} />
          <div className={styles.userInfo}>
            <p className={styles.userRegister} dir="rtl">
              رقم الجوال : <span>{data?.mobile_number}</span>
            </p>
          </div>
          <hr className={styles.infoLine} />
        </div>
      </div>
      <button className={styles.print} onClick={handlePrint}>
        طباعة
      </button>
    </>
  );
}
