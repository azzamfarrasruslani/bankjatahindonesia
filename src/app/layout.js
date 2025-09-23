// src/app/layout.js

import { Poppins } from "next/font/google";
import "../lib/i18n";
import "./globals.css";

// Komponen UI global
import FloatingWAButton from "@/components/common/FloatingWAButton";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";

// Import font Poppins dari Google Fonts via next/font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Bank Jatah",
  description: "Website resmi Bank Jatah Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWAButton />
      </body>
    </html>
  );
}
