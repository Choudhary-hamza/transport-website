"use client"
import styles from "./CompanyQR.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export function CompanyQR() {
    const [qrData, setQrData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [currentQR, setCurrentQR] = useState(null);
    const qrRef = useRef();

    const pickQRHandler = () => {
        qrRef.current.click();
    };

    const getQR = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setCurrentQR(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    useEffect(() => {
        async function getQRData() {
            const response = await fetch("/api/getQR", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (response.status === 200) {
                if (responseData.qr === null) {
                    setError("please select a QR");
                } else {
                    setQrData(responseData.qr);
                    setCurrentQR(responseData.qr);
                }
            } else if (response.status === 404) {
                setError("QR not found");
            } else {
                setError("Error fetching QR code");
            }
        }
        getQRData();
    }, []);

    function handleQRChange(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        if (currentQR === qrData) {
            setError("يرجى تغيير QR أولاً");
            return;
        }
        if (!currentQR) {
            setError("يرجى اختيار QR.");
            return;
        }

        fetch("/api/update-qr", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ qr: currentQR }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setQrData(currentQR);
                    setSuccess("تم تغيير QR بنجاح ✅");
                } else {
                    setError(data.message || "حدث خطأ أثناء تحديث QR");
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <main className={styles.main}>
            <p className={styles.heading}>
                يمكنك تغيير QR الشركة من هنا
            </p>
            
            {error && (
                <div className={styles.errorContainer}>
                    <p className={styles.errors}>{error}</p>
                </div>
            )}
            
            {success && (
                <div className={styles.successContainer}>
                    <p className={styles.success}>{success}</p>
                </div>
            )}

            <form className={styles.form} onSubmit={handleQRChange}>
                <div className={styles.qrPicker}>
                    <div className={styles.pickerInput}>
                        <label htmlFor="qr">QR Code</label>
                        <input
                            type="file"
                            id="qr"
                            name="qr"
                            accept={"image/png, image/jpeg, image/jpg"}
                            ref={qrRef}
                            onChange={getQR}
                        />
                    </div>
                    <button type="button" onClick={pickQRHandler}>
                        Pick QR
                    </button>
                    <div className={styles.preview}>
                        {!currentQR && <p>No QR picked yet</p>}
                        {currentQR && (
                            <Image src={currentQR} alt="QR Code" fill />
                        )}
                    </div>
                </div>
                <button type="submit" className={styles.submit}>
                    Edit QR
                </button>
            </form>
        </main>
    );
}