import "bootstrap/dist/css/bootstrap.min.css";
export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
