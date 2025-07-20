"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./driverProfile.module.css";
import Image from "next/image";
export default function DriverProfile({ userId }) {
  const [driver, setDriver] = useState(null);
  const imageRef = useRef();
  const [currentImage, setImage] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const pickImageHandler = () => {
    imageRef.current.click();
  };
  const getImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  useEffect(() => {
    async function fetchUser(userId) {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setDriver(data.user);
        setImage(data.user.photo);
      }
    }
    fetchUser(userId);
  }, [userId]);
  function handleChange(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (currentImage === driver?.photo) {
      setError("يرجى تغيير الصورة أولاً");
      return;
    }
    if (!currentImage) {
      setError("يرجى اختيار صورة.");
      return;
    }
    fetch("/api/userProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, photo: currentImage }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDriver(data.data); // use the correct key returned from API
        setSuccess("تم تغيير الصورة بنجاح ✅");
        
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  return (
    <main className={styles.main}>
      <p className={styles.heading}>
        يمكنك فقط تغيير صورتك، أما باقي المعلومات فلا يمكن تغييرها إلا من قبل
        المسؤول.
      </p>
      {error ? (
        <div className={styles.errorContainer}>
          <p className={styles.errors}>{error}</p>
        </div>
      ) : (
        ""
      )}
      {success && (
  <div className={styles.successContainer}>
    <p className={styles.success}>{success}</p>
  </div>
)}
      <form className={styles.form} onSubmit={handleChange}>
        <div className={styles.imagePicker}>
          <div className={styles.pickerInput}>
            <label htmlFor="image">image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept={"image/png, image/jpeg ,image/jpg"}
              ref={imageRef}
              onChange={getImage}
            />
          </div>
          <button type="button" onClick={pickImageHandler}>
            Pick image
          </button>
          <div className={styles.preview}>
            {!currentImage && <p>No image picked yet</p>}
            {currentImage && (
              <Image src={currentImage} alt="picked image" fill />
            )}
          </div>
        </div>
        <button type="submit" className={styles.submit}>
          Edit
        </button>
      </form>
      <form className={styles.form}>
        <input
          className={styles.inputField}
          type="text"
          name="name"
          id="name"
          defaultValue={driver?.name}
          placeholder="اسم السائق"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="nationality"
          id="nationality"
          defaultValue={driver?.nationality}
          placeholder="الجنسية"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          defaultValue={driver?.mobile_number}
          placeholder="رقم الجوال"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="residencyNumber"
          id="residencyNumber"
          defaultValue={driver?.residency_number}
          placeholder="رقم الاقامة"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="cardNumber"
          id="cardNumber"
          defaultValue={driver?.card_number}
          placeholder="رقم البطاقة"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="carType"
          id="carType"
          defaultValue={driver?.car_type}
          placeholder="نوع السيارة"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="plateNumber"
          id="plateNumber"
          defaultValue={driver?.car_plate_number}
          placeholder="رقم لوحة السيارة"
          disabled
        />
        <input
          className={styles.inputField}
          type="text"
          name="password"
          id="password"
          defaultValue={driver?.password}
          placeholder="كلمة السر للدخول"
          disabled
        />
      </form>
    </main>
  );
}
