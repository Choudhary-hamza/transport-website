"use client";
import styles from "./allDrivers.module.css";
import DriverCard from "@/components/all-driver/driverCard";
import { useRef, useState, useEffect } from "react";

export default function AllDriversPage() {
  const [errors, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [isDeleted, setDeletion] = useState("");
  const searchRef = useRef();
  async function formHandler(e) {
    e.preventDefault();
    setSearching(true);
    setError(null);
    const search = searchRef.current.value;
    if (!search || search.trim() === "") {
      setError("يرجى إدخال مصطلح البحث.");
      return;
    }
    try {
      const response = await fetch("/api/all-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        searchRef.current.value = "";
        setData(Array.isArray(responseData.result) ? responseData.result : []);
      } else if (response.status === 404) {
        setData([]);
        setError("لا يوجد سائق أو سيارة بهذا الاسم.");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    if (!isSearching) {
      async function fetchData() {
        try {
          const response = await fetch("/api/all-driver", {
            method: "GET",
          });
          const responseData = await response.json();
          if (response.status === 200) {
            setData(
              Array.isArray(responseData.result) ? responseData.result : []
            );
          } else if (response.status === 404) {
            setError("لا يوجد سائق حتى الآن.");
          }
        } catch (error) {
          setError(error.message);
        }
      }
      fetchData();
    } else {
      setData([]); // Ensure this matches the server-rendered initial state
    }
  }, [isSearching]);
  async function deleteDriver(index, id) {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    try {
      const response = await fetch("/api/all-driver", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.status === 200) {
        setDeletion("تم حذف السائق بنجاح");
      } else if (response.status === 404) {
        setDeletion(" حاول مرة أخرى");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    if (isDeleted !== "") {
      const timeout = setTimeout(() => {
        setDeletion("");
      }, 3000);

      return () => clearTimeout(timeout); // cleanup on unmount or before next effect
    }
  }, [isDeleted]);
  return (
    <>
      {isDeleted ? <div className={styles.message}>{isDeleted}</div> : ""}
      <form className={styles.form_container} onSubmit={formHandler}>
        <label className={styles.label}>
          <input
            type="text"
            name="search"
            id="search"
            required
            ref={searchRef}
            className={styles.inputField}
            placeholder="ابحث عن اسم السائق او سيارة"
          ></input>
        </label>
        <button type="submit" className={styles.submit}>
          بحث
        </button>
      </form>
      {errors ? (
        <menu className={styles.menu}>
          <p className={styles.error}>{errors}</p>
        </menu>
      ) : (
        ""
      )}
      {data ? (
        <menu className={styles.menu}>
          {data.map((eachData, index) => (
            <DriverCard
              key={index}
              index={index}
              eachData={eachData}
              deleteDriver={deleteDriver}
            ></DriverCard>
          ))}
        </menu>
      ) : (
        ""
      )}
      <menu className={styles.menu}></menu>
    </>
  );
}
