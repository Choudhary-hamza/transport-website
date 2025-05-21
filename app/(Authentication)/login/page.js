"use client";
import Image from "next/image";
import styles from "./login.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage({ searchParams }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  async function formSubmitHandler(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    if (response.status === 200) {
      nameRef.current.value = "";
      passwordRef.current.value = "";
      router.push("/book/all-flight");
    } else {
      nameRef.current.value = "";
      passwordRef.current.value = "";
      setError(true);
    }
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_image}>
          <Image src="/logo.png" alt="company logo" fill></Image>
        </div>
      </header>
      <div className={styles.welcome}>
        <p>اهلا بك عزيزي السائق</p>
        <p> Welcome Driver </p>
      </div>
      <div className={styles.instruction}>
        <p>ادخل اسمك وكلمة السر الخاصة بك لإنشاء رحلة جديدة </p>
        <p>fill Your Name and Password </p>
      </div>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <input
            className={styles.inputField}
            required
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            placeholder="Name Of Driver اسم السائ"
          />
          <input
            className={styles.inputField}
            required
            type="password"
            name="password"
            ref={passwordRef}
            id="password"
            placeholder="Password | كلمة الس"
          />
          <button type="submit" className={styles.button}>
            login
          </button>
        </form>
      </div>
      <div className={styles.errorContainer}>
        {error ? (
          <p className={styles.errors}>
            {" "}
            Data not match! | البيانات غير متطابقة{" "}
          </p>
        ) : (
          <p className={styles.errors}>
            الرجاء ملى الحقول | please fill the inputs
          </p>
        )}
      </div>
      <p className={styles.end_field}>
        نظام حجوزات مؤسسة ماهر السفر الالكتروني{" "}
      </p>
    </>
  );
}
