import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Card",
};

export default function PrintLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
