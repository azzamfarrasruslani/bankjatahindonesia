// src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "../lib/i18n";
import "./globals.css";

// Komponen UI global
import FloatingWAButton from "@/components/common/FloatingWAButton";
import Navbar from "@/app/layout/navbar";
import Footer from "@/app/layout/footer";

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
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar /> {/* Navbar muncul di semua halaman */}
        {children}
        <Footer /> {/* Footer muncul di semua halaman */}
        <FloatingWAButton /> {/* Tombol WA */}
      </body>
    </html>
  );
}
