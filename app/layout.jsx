import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Frontend Quizz",
  description: "Test your frontend and fullstack developer skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
