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
  useEffect(() => {
  if (driverData && guestData?.[0]) {
    document.title = `${driverData.name} & ${guestData[0].name}`;
  } else if (driverData) {
    document.title = driverData.name;
  } else {
    document.title = "Flight Card"; // Default title
  }
}, [driverData, guestData]);

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
          <p className={styles.company_information}>شركة الناقل العالمي المحدودة</p>
          <p className={styles.company_information}>س.ت:4031299076</p>
          <p className={styles.company_information}>رقم الهاتف
:9392 451 54 966</p>
        </div>
      </header>
      <p className={styles.contract}>عقد نقل على الطرق البرية</p>
      <div className={styles.container2}>
        <p className={styles.date} dir="rtl">
          التاريخ:{flightData?.trip_date}
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          تم ابرام هذا العقد بين المتعاقدين بناء على المادة )۳۹( التاسعة والثالثون من االلئحة المنظمة للنشاط النقل المتخصص وتأجير وتوجيه
الحافالت وبناء على الفقرة )۱( من المادة )۳۹( والتي تنص على أن يجب على الناقل ابرام عقد نقل مع األطراف المحددين في المادة
)٤٠( قبل تنفيذ عمليات النقل للتلية التي تحددها هيئة النقل. وبناء على على الطرق البرية وبما ال يخالف أحكام هذه االلئحة ووفقا ما سبق
تم ابرام عقد النقل بين األطراف اآلتية
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          الطرف االول :شركة الناقل العالمي المحدودة

 :{" "}
          <b className={styles.bold}>
            L.N:35/00003211
          </b>
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          الطرف الثاني: السيد/{" "}
          <b className={styles.bold}> {driverData?.name} </b>
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
          االتى أسمائهم في الكشف{" "}
        </p>
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
        اتفق الطرفان على ان ينفذ الطرف األول عملية النقل للطرف الثاني مع مرافقيه وذويهم من الموقع المحدد مسبقا مع الطرف الثاني
وتوصيلهم إلى الجهة المحددة بالعقد{" "}
        </p>
        <p className={styles.paragaraph2} dir="rtl">
          وصوا ل :{" "}
          <span className={styles.bold2}>{flightData?.coming_from} </span>
        </p>
        <p className={styles.paragaraph2} dir="rtl">
          {" "}
          وصولا الى:{" "}
          <span className={styles.bold2}> {flightData?.arrival_to} </span>
        </p>
       
        <p className={styles.paragaraph1} dir="rtl">
          {" "}
         في حال الغاء التعاقد ألي سبب شخصي او اسباب أخرى تتعلق في الحجوزات او االنظمة تكون سياسة اإللغاء واالستبدال حسب
نظام وزارة التجارة السعودي في حالة الحجز وتم االلغاء قبل موعد الرحلة بأكثر .من ٢٤ ساعة يتم استرداد المبلغ كامل{" "}
        </p>
        <p className={styles.paragaraph12} dir="rtl">
          {" "}
         في في حالة طلب الطرف الثاني الحجز من خالل الموقع االلكتروني للمؤسسة يعتبر هذا الحجز وموافقته على الشروط واالحكام بالموقع
االلكتروني هو موافقة على هذا العقد لتنفيذ عملية النقل المتفق عليها مع الطرف األول بواسطة حافالت المؤسسة المرخصة والمتوافقة مع
االشتراطات المقررة من هيئة النقل{" "}
        </p>
        <div className={styles.signature}>
          <Image src="/signature.png" alt="company image" fill></Image>
        </div>
       <section className={styles.header}>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information1}>Global Carrier LTD</p>
            <p className={styles.company_information1}>L.N:35/00003211</p>
            <p className={styles.company_information1}>C.R:4031299076</p>
          </div>
          <div className={styles.header_subcontainer}>
            <div className={styles.flight_barcode}>
              <Image src="/logo.png" alt="company image" fill></Image>
            </div>
          </div>
          <div className={styles.header_subcontainer}>
            <p className={styles.company_information1}>شركة</p>
            <p className={styles.company_information1}>الناقل العالمي</p>
            <p className={styles.company_information1}> المحدودة</p>
          </div>
        </section>
        <p className={styles.company_information2}>بيانات السائق والركاب </p>
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
           رقم الرحلة :{" "}
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
        <table className={`${styles.tableCustom} ${styles.tableStriped}`}>
          <thead>
            <tr>
              <th className={styles.thab}>رقم الهوية/الجواز</th>
              <th className={styles.thab}>الجنسية</th>
              <th className={styles.thab}>اسم العميل</th>
            </tr>
          </thead>
          <tbody>
            {guestTableRows.map((guest, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>{guest.id_number || ""}</td>
                <td>{guest.nationality || ""}</td>
                <td>{guest.name || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={styles.company_information2}>*** ملاحظة هامة ***</p>
        <p className={styles.company_information1}>
         حال عدم تطابق بيانات األسماء مع االثبات تكن عرضة للجزاء و هذا تعهد منا بذلك شاكرين ومقدرين تعاونكم معنا
        </p>
        <div className={styles.signature}>
          <Image src="/signature.png" alt="company image" fill></Image>
        </div>
      </div>
      <button className={styles.print} onClick={handlePrint}>
        طباعة
      </button>
    </div>
  );
}
