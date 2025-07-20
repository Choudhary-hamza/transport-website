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
          <input
            className={styles.inputField}
            type="text"
            name="name"
            id="name"
            placeholder="اسم السائق"
            defaultValue={state.values?.name || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="nationality"
            id="nationality"
            placeholder="الجنسية"
            defaultValue={state.values?.nationality || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="رقم الجوال"
            defaultValue={state.values?.phoneNumber || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="residencyNumber"
            id="residencyNumber"
            placeholder="رقم الاقامة"
            defaultValue={state.values?.residencyNumber || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="رقم البطاقة"
            defaultValue={state.values?.cardNumber || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="carType"
            id="carType"
            placeholder="نوع السيارة"
            defaultValue={state.values?.carType || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="plateNumber"
            id="plateNumber"
            placeholder="رقم لوحة السيارة"
            defaultValue={state.values?.plateNumber || ""}
          />
          <input
            className={styles.inputField}
            type="text"
            name="password"
            id="password"
            placeholder="كلمة السر للدخول"
            defaultValue={state.values?.password || ""}
          />
          <p className={styles.photoDescription}> صورة السائق </p>
          <ImagePicker label=" صورة السائق " name="image" />
          {state.errors && (
            <div className={styles.errorContainer}>{state.errors}</div>
          )}
          <button type="submit" className={styles.submit}>
            Create
          </button>
        </form>
      </main>
    </>
  );
}
