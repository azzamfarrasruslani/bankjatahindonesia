import { Geist, Geist_Mono } from "next/font/google";
import "../lib/i18n"; // <-- Tambahkan ini paling atas
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bank Jatah",
  description: "Website resmi Bank Jatah Indonesia",
};

export default function RootLayout({ children }) {
  const lang = typeof window !== "undefined"
    ? localStorage.getItem("language") || "id"
    : "id"; // fallback server-side

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
