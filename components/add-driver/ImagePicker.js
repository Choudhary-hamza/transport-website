"use client";
import { useState, useRef } from "react";
import styling from "./imagePicker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const imageRef = useRef();
  const [currentImage, setImage] = useState();
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
  return (
    <div className={styling.imagePicker}>
      <div className={styling.pickerInput}>
        <label htmlFor={name}>{label}</label>
        <input
          type="file"
          id={name}
          name={name}
          accept={"image/png, image/jpeg ,image/jpg"}
          ref={imageRef}
          onChange={getImage}
        />
      </div>
      <button type="button" onClick={pickImageHandler}>
        Pick image
      </button>
      <div className={styling.preview}>
        {!currentImage && <p>No image picked yet</p>}
        {currentImage && <Image src={currentImage} alt="picked image" fill />}
      </div>
    </div>
  );
}
