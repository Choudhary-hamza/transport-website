"use client";
import { useActionState } from "react";
import styles from "./AdminProfile.module.css";
export default function AdminProfile({ action }) {
  const [state, updatedForm] = useActionState(action, {});
  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitle}>:Change the administrator password</div>

      <form className={styles.form} action={updatedForm}>
        {state.errors && (
          <div className={styles.errorContainer}>{state.errors}</div>
        )}
        <input type="hidden" name="Dname" value="admin" />
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="password"
            name="Dpass"
            placeholder="previous password"
            required
          />
          <input
            className={styles.input}
            type="password"
            name="pass1"
            placeholder="New password"
            required
          />
          <input
            className={styles.input}
            type="password"
            name="pass2"
            placeholder="Repeat new password"
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
