"use client";
import { useEffect, useState } from "react";
import styles from "./flightCard.module.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qrcode from "qrcode";

export default function FlightCard() {
  const [flightData, setFlightData] = useState(null);
  const [driverData, setDriverData] = useState(null);
  const [guestData, setGuestData] = useState([]);
  const [error, setError] = useState(null);
  const [QRCode, setQRCode] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const flightId = searchParams.get("flightId");

  useEffect(() => {
    if (!flightId) {
      router.push("/login");
      return;
    }

    const fetchFlightData = async () => {
      try {
        const response = await fetch("api/flight-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flightId, type: "flight" }),
        });

        const responseData = await response.json();

        if (response.status === 200) {
          setFlightData(responseData.result);
          return responseData.result.driver_id;
        } else if (response.status === 404) {
          setError(responseData.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchDriverData = async (userId) => {
      try {
        const response = await fetch("api/flight-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ driverId: userId, type: "driver" }),
        });

        const responseData = await response.json();

        if (response.status === 200) {
          setDriverData(responseData.result);
        } else if (response.status === 404) {
          setError(responseData.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchGuestData = async () => {
      try {
        const response = await fetch("api/flight-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flightId, type: "guest" }),
        });

        const responseData = await response.json();

        if (response.status === 200) {
          setGuestData(responseData.result);
        } else if (response.status === 404) {
          setError(responseData.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      const userId = await fetchFlightData();
      if (userId) {
        await fetchDriverData(userId);
        await fetchGuestData();
      }
      try {
        const qrDataURL = await qrcode.toDataURL(
          `http://localhost:3000/flight-card?flightId=${flightId}`
        );
        setQRCode(qrDataURL);
      } catch (err) {
        console.error("QR Code generation failed", err);
      }
    };

    fetchData();
  }, [flightId]);
  function handlePrint() {
    window.print();
  }
  const remainingGuests = guestData.slice(1); // The rest
  const maxRows = 12;

  // Fill remaining guest table with placeholders if fewer than 12
  const guestTableRows = Array.from(
    { length: maxRows },
    (_, i) => remainingGuests[i] || {}
  );

  return (
    <div className={styles.main_container}>
      <header className={styles.header}>
        <div className={styles.header_subcontainer}>
          <div className={styles.flight_barcode}>
            {QRCode && <Image src={QRCode} alt="QR code" fill />}
          </div>
        </div>
        <div className={styles.header_subcontainer}>
          <div className={styles.flight_barcode}>
            <Image src="/logo.png" alt="company image" fill></Image>
          </div>
        </div>
        <div className={styles.header_subcontainer}>
          <p className={styles.company_information}>مؤسسة ماهر السفر للنقل</p>
          <p className={styles.company_information}>س.ت:4031272349</p>
        </div>
      </header>
      <p className={styles.contract}>عقد نقل على الطرق البرية</p>
      <div className={styles.container2}>
        <p className={styles.date} dir="rtl">
          التاريخ:{flightData?.trip_date}
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          تم ابرام هذا العقد بين المتعاقدين بناء على المادة (39) التاسعة
          والثلاثون من اللائحة المنظمة لنشاط النقل المتخصص وتأجير وتوجيه
          الحافلات وبناء على الفقرة (1) من المادة (39) والتي تنص على أن يجب على
          الناقل ابرام عقد نقل مع الأطراف المحددين في المادة (40) قبل تنفيذ
          عمليات النقل على الطرق البرية وبما لا يخالف أحكام هذه اللائحة ووفقاً
          للآلية التي تحددها هيئة النقل
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          وبناء على ما سبق تم ابرام عقد النقل بين الأطراف الآتية:{" "}
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          الطرف الأول :{" "}
          <b className={styles.bold}>
            {" "}
            مؤسسة ماهر السفر للنقل ترخيص رقم: 35/00002393/{" "}
          </b>
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          الطرف الثاني: السيد/{" "}
          <b className={styles.bold}> {driverData?.name} </b>
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          اتفق الطرفان على ان ينفذ الطرف الأول عملية النقل للطرف الثاني مع
          مرافقيه وذويهم من الموقع المحدد مسبقا مع الطرف الثاني وتوصيلهم الى
          الجهه المحدده بالعقد{" "}
        </p>
        <p className={styles.paragaraph2} dir="rtl">
          النقل من:{" "}
          <span className={styles.bold2}>{flightData?.coming_from} </span>
        </p>
        <p className={styles.paragaraph2} dir="rtl">
          {" "}
          وصولا الى:{" "}
          <span className={styles.bold2}> {flightData?.arrival_to} </span>
        </p>
        <p className={styles.paragaraph2} dir="rtl">
          {" "}
          مدة الرحلة :{" "}
          <span className={styles.bold2}> {flightData?.trip_duration} </span>
        </p>
        <p className={styles.paragaraph2} dir="rtl">
          {" "}
          سعر الرحلة :{" "}
          <span className={styles.bold2}>
            {flightData?.price ? flightData.price : "آجل ر.س"}{" "}
          </span>
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          في حال الغاء التعاقد لاي سبب شخصي او اسباب اخرى تتعلق في الحجوزات او
          الانظمه تكون سياسة الالغاء والاستبدال حسب نظام وزارة التجارة السعودي
          في حالة الحجز وتم الالغاء قبل موعد الرحلة باكثر من 24 ساعة يتم استرداد
          المبلغ كامل. في حالة طلب الطرف الثاني الحجز من خلال الموقع الالكتروني
          للمؤسسه يعتبر هذا الحجز وموافقته على الشروط والاحكام بالموقع
          الالكتروني هو موافقة على هذا العقد لتنفيذ عملية النقل المتفق عليها مع
          الطرف الأول بواسطة حافلات المؤسسة المرخصة والمتوافقة مع الاشتراطات
          المقررة من هيئة النقل.{" "}
        </p>
        <div className={styles.signature}>
          <Image src="/logo.png" alt="company image" fill></Image>
        </div>
        <section className={styles.header}>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information1}>Maher Transport</p>
            <p className={styles.company_information1}>L.N:35/00002393</p>
            <p className={styles.company_information1}>C.R:4031272349</p>
          </div>
          <div className={styles.header_subcontainer}>
            <div className={styles.flight_barcode}>
              <Image src="/logo.png" alt="company image" fill></Image>
            </div>
          </div>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information1}>مؤسسة</p>
            <p className={styles.company_information1}>ماهر السفر</p>
            <p className={styles.company_information1}>للنقل</p>
          </div>
        </section>
        <p className={styles.company_information2}>بيانات السائق والركاب </p>
        <p className={styles.company_information1}>لمؤسسة ماهر السفر للنقل</p>
        <section className={styles.header1}>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information3} dir="rtl">
              اليوم :
              <span className={styles.bold2}> {flightData?.trip_day} </span>
            </p>
          </div>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information3} dir="rtl">
              وقت الرحلة :
              <span className={styles.bold2}> {flightData?.arrival_time} </span>
            </p>
          </div>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information3} dir="rtl">
              التاريخ :
              <span className={styles.bold2}>{flightData?.trip_date}</span>
            </p>
          </div>
        </section>
        <p className={styles.company_information3} dir="rtl">
          {" "}
          رحلة من :{" "}
          <span className={styles.bold2}> {flightData?.coming_from} </span>
        </p>
        <p className={styles.company_information3} dir="rtl">
          {" "}
          الى : <span className={styles.bold2}> {flightData?.arrival_to} </span>
        </p>
        <p className={styles.company_information3} dir="rtl">
          {" "}
          : رقم الرحلة{" "}
          <span className={styles.bold2}>{flightData?.flight_numbers}</span>
        </p>
        <table className={`${styles.tableCustom}`}>
          <thead>
            <tr>
              <th className={styles.thab}>رقم اللوحة</th>
              <th className={styles.thab}>نوع السيارة</th>
              <th className={styles.thab}>رقم الإقامة/الهوية</th>
              <th className={styles.thab}>الجنسية</th>
              <th className={styles.thab}>اسم السائق</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{driverData?.car_plate_number}</td>
              <td>{driverData?.car_type}</td>
              <td>{driverData?.residency_number}</td>
              <td>{driverData?.nationality}</td>
              <td>{driverData?.name}</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.tableCustom}>
          <thead>
            <tr>
              <th className={styles.thab}>رقم الهوية/الجواز</th>
              <th className={styles.thab}>الجنسية</th>
              <th className={styles.thab}>اسم العميل</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{guestData[0]?.id_number}</td>
              <td>{guestData[0]?.nationality}</td>
              <td>{guestData[0]?.name}</td>
            </tr>
          </tbody>
        </table>
        <table className={`${styles.tableCustom1} ${styles.tableStriped}`}>
          <thead>
            <tr>
              <th className={styles.thab}>رقم الهوية/الجواز</th>
              <th className={styles.thab}>الجنسية</th>
              <th className={styles.thab}>اسم العميل</th>
            </tr>
          </thead>
          <tbody>
            {guestTableRows.map((guest, index) => (
              <tr key={index}>
                <td>{guest.id_number || ""}</td>
                <td>{guest.nationality || ""}</td>
                <td>{guest.name || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={styles.company_information2}>*** ملاحظة هامة ***</p>
        <p className={styles.company_information1}>
          فى حال عدم تطابق بيانات الضيف مع الاثبات نكن عرضه للجزاء وهذا تعهد منا
          بذلك
        </p>
        <p className={styles.company_information1}>
          للاستفسارات : 00966507975123
        </p>
        <div className={styles.signature}>
          <Image src="/logo.png" alt="company image" fill></Image>
        </div>
      </div>
      <button className={styles.print} onClick={handlePrint}>
        طباعة
      </button>
    </div>
  );
}
