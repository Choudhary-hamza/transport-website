import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GLOBAL CARRIER LTD",
  description: "Your trusted transportation partner for Umrah and Hajj pilgrims",
  icons: {
    icon: "/icon.png", // You can also add 'shortcut' or 'apple' here
  },
  keywords: "transportation, umrah, hajj, pilgrims, global carrier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
} 