import "bootstrap/dist/css/bootstrap.min.css";
import ContentHeader from "@/components/content/contentHeader";

export const metadata = {
  title: "Dashboard",
  description: "Admin and driver dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContentHeader />
        {children}
      </body>
    </html>
  );
}
