import { checkPasswords, updatePassword } from "@/lib/admin";
import AdminForm from "./AdminForm";
import { redirect } from "next/navigation";

export default function AdminProfileWrapper() {
  async function formHandler(prev, formData) {
    "use server";
    const previousPassword = formData.get("Dpass");
    const newPassword = formData.get("pass1");
    const repeatPassword = formData.get("pass2");
    const isValid = await checkPasswords(previousPassword);
    console.log("isValid", isValid);
    let errors = [];
    if (!isValid) {
      errors.push("previous password is incorrect");
    }
    if (errors.length > 0) {
      return { errors };
    }
    if (newPassword !== repeatPassword) {
      errors.push("passwords do not match");
    }
    if (errors.length > 0) {
      return { errors };
    }
    const savePassword = await updatePassword(newPassword);
    if (!savePassword) {
      errors.push("error occuring while updating password");
    }
    {
      errors: null;
    }
    redirect("/book/all-flight");
  }

  return <AdminForm action={formHandler} />;
}
