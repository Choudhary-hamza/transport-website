import "bootstrap/dist/css/bootstrap.min.css";
import ContentHeader from "@/components/content/contentHeader";

export const metadata = {
  title: "Dashboard",
  description: "Admin and driver dashboard",
};

export default function BookLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ContentHeader />
      {children}
    </div>
  );
}
