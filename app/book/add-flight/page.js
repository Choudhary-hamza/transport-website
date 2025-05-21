import { createFlight } from "@/lib/flight";
import styles from "./AddFlight.module.css";
import { cookies } from "next/headers";
import { createGuest } from "@/lib/guest";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function AddFlight() {
  const cookieStore = cookies();
  const userId = JSON.parse(cookieStore.get("userId")?.value);
  const guests = Array.from({ length: 11 }, (_, i) => i + 2); // [2, 3, ..., 12]// [1, 2, ..., 11]
  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  function arabicOrdinal(n) {
    const ordinals = [
      "",
      "الثاني",
      "الثالث",
      "الرابع",
      "الخامس",
      "السادس",
      "السابع",
      "الثامن",
      "التاسع",
      "العاشر",
      "الحادي عشر",
      "الثاني عشر",
    ];
    return ordinals[n] || "";
  }

  async function handleForm(formData) {
    "use server";

    // First guest
    const guest_name1 = formData.get("guest_name");
    const nationality1 = formData.get("nationality");
    const id1 = formData.get("id");
    const contact = formData.get("contact");
    const pickup = formData.get("pickup");
    const destination = formData.get("destination");
    const day = formData.get("day");
    const date = formData.get("date");
    const arrival_time = formData.get("arrival_time");
    const duration = formData.get("duration");
    const flight_number = formData.get("flight_number");
    const price = formData.get("price");

    console.log(userId);

    const flightId = await createFlight(
      contact,
      pickup,
      destination,
      day,
      date,
      arrival_time,
      duration,
      flight_number,
      price,
      userId
    );
    if (!flightId) {
      throw new Error("Failed to create flight.");
    }
    await createGuest(guest_name1, nationality1, id1, 1, flightId);

    for (let i = 2; i <= 12; i++) {
      const name = formData.get(`vname${i}`);
      const nat = formData.get(`g${i}`);
      const idNum = formData.get(`vnumber${i}`);

      if (name?.trim() || nat?.trim() || idNum?.trim()) {
        await createGuest(name, nat, idNum, 0, flightId);
      }
    }
    revalidatePath("/book/all-flight");
    redirect("/book/all-flight");
  }
  return (
    <div className={styles.container}>
      <p className={styles.head}>Guest Information</p>
      <form className={styles.main_container} action={handleForm}>
        <div className={styles.form_container1}>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="guest_name">
              Name of the first guest
            </label>
            <input
              type="text"
              required
              id="guest_name"
              name="guest_name"
              className={styles.input}
              placeholder="   اسم الضيف الاول "
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="nationality">
              Nationality of the first guest
            </label>
            <input
              type="text"
              required
              id="nationality"
              name="nationality"
              className={styles.input}
              placeholder="  جنسية الضيف الأول "
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="id">
              ID number of guest
            </label>
            <input
              type="text"
              required
              id="id"
              name="id"
              className={styles.input}
              placeholder="الجواز/رقم الهوية"
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="contact">
              Contact number for first guest
            </label>
            <input
              type="text"
              required
              id="contact"
              name="contact"
              className={styles.input}
              placeholder=" رقم الواصل للضيف الاول"
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="pickup">
              Coming from
            </label>
            <input
              type="text"
              required
              id="pickup"
              name="pickup"
              className={styles.input}
              placeholder="جهة القدوم"
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="destination">
              Arrival to
            </label>
            <input
              type="text"
              required
              id="destination"
              name="destination"
              className={styles.input}
              placeholder="جهة الوصول"
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="day">
              يوم الرحلة
            </label>
            <select
              required
              id="day"
              name="day"
              className={styles.input}
              defaultValue=""
            >
              <option value="" disabled hidden>
                اختر يوم الرحلة
              </option>
              <option value="Sunday">الأحد</option>
              <option value="Monday">الإثنين</option>
              <option value="Tuesday">الثلاثاء</option>
              <option value="Wednesday">الأربعاء</option>
              <option value="Thursday">الخميس</option>
              <option value="Friday">الجمعة</option>
              <option value="Saturday">السبت</option>
            </select>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="date">
              Date
            </label>
            <input
              required
              type="date"
              id="date"
              name="date"
              className={styles.input}
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="arrival_time">
              Arrival time
            </label>
            <input
              type="time"
              required
              id="arrival_time"
              name="arrival_time"
              className={styles.input}
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="duration">
              Trip duration
            </label>
            <input
              type="number"
              required
              id="duration"
              name="duration"
              className={styles.input}
              placeholder="مدة الرحلة"
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="flight_number">
              Flight Number
            </label>
            <input
              type="text"
              id="flight_number"
              name="flight_number"
              className={styles.input}
              placeholder=" رقم الرحلة"
            ></input>
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} dir="rtl" htmlFor="price">
              Trip price
            </label>
            <input
              type="text"
              required
              id="price"
              name="price"
              className={styles.input}
              placeholder="آجل"
            ></input>
          </div>
        </div>
        <div className={styles.form_container2}>
          <p className={styles.guest_header} dir="rtl">
            {" "}
            يمكنك اضافة المزيد من الضيوف{" "}
          </p>
          {guests.map((index) => (
            <details key={index} className={styles.details_section}>
              <summary>اضافة add more</summary>

              <div className={styles.form_container1}>
                <div className={styles.input_container}>
                  <label className={styles.label} dir="rtl">
                    Name of the{" "}
                    {index === 1 ? "second" : `${ordinal(index)} guest`}
                  </label>
                  <input
                    type="text"
                    name={`vname${index}`}
                    className={styles.input}
                    placeholder={`اسم الضيف ${arabicOrdinal(index)}`}
                  />
                </div>

                <div className={styles.input_container}>
                  <label className={styles.label} dir="rtl">
                    Nationality of the{" "}
                    {index === 1 ? "second" : `${ordinal(index)} guest`}
                  </label>
                  <input
                    type="text"
                    name={`g${index}`}
                    className={styles.input}
                    placeholder={`جنسية الضيف ${arabicOrdinal(index)}`}
                  />
                </div>

                <div className={styles.input_container}>
                  <label className={styles.label} dir="rtl">
                    ID for the{" "}
                    {index === 1 ? "second" : `${ordinal(index)} guest`}
                  </label>
                  <input
                    type="text"
                    name={`vnumber${index}`}
                    className={styles.input}
                    placeholder={`رقم هوية/الجواز ${arabicOrdinal(index)}`}
                  />
                </div>
              </div>
            </details>
          ))}
        </div>
        <button className={styles.submit} type="submit">
          save
        </button>
      </form>
    </div>
  );
}
