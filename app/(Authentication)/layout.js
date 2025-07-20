import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function AuthLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
