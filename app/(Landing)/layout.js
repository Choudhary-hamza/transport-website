import MediaSection from "@/components/landing-page/mediaSection";
import MenuSection from "@/components/landing-page/menuSection";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";

export const metadata = {
  title: "GLOBAL CARRIER LTD",
  description: "Your trusted transportation partner for Umrah and Hajj pilgrims",
  icons: {
    icon: "/icon.png", // You can also add 'shortcut' or 'apple' here
  },
  keywords: "transportation, umrah, hajj, pilgrims, global carrier",
};


export default function LandingLayout({ children }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <MediaSection />
      <MenuSection />
      {children}
    </div>
  );
}
