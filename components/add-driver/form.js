"use client";
import ImagePicker from "./ImagePicker";
import { useActionState } from "react";
import styles from "./addDriver.module.css";
export default function PostForm({ action }) {
  const [state, updatedForm] = useActionState(action, {});
  return (
    <>
      <p className={styles.heading}>أدخل معلومات السائقين الجدد</p>
      <main className={styles.main}>
        <form className={styles.form} action={updatedForm}>
          {state.errors && (
            <div className={styles.errorContainer}>{state.errors}</div>
          )}
          <input
            className={styles.inputField}
            type="text"
            name="name"
            id="name"
            placeholder="اسم السائق"
          />
          <input
            className={styles.inputField}
            type="text"
            name="nationality"
            id="nationality"
            placeholder="الجنسية"
          />
          <input
            className={styles.inputField}
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="رقم الجوال"
          />
          <input
            className={styles.inputField}
            type="text"
            name="residencyNumber"
            id="residencyNumber"
            placeholder="رقم الاقامة"
          />
          <input
            className={styles.inputField}
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="رقم البطاقة"
          />
          <input
            className={styles.inputField}
            type="text"
            name="carType"
            id="carType"
            placeholder="نوع السيارة"
          />
          <input
            className={styles.inputField}
            type="text"
            name="plateNumber"
            id="plateNumber"
            placeholder="رقم لوحة السيارة"
          />
          <input
            className={styles.inputField}
            type="password"
            name="password"
            id="password"
            placeholder="كلمة السر للدخول"
          />
          <p className={styles.photoDescription}> صورة السائق </p>
          <ImagePicker label=" صورة السائق " name="image" />
          <button type="submit" className={styles.submit}>
            Create
          </button>
        </form>
      </main>
    </>
  );
}
