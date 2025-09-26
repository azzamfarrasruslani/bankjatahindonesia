"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFoundPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay animasi masuk
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-6">
      <div
        className={`text-center transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-8xl font-bold text-[#FB6B00] drop-shadow-sm">404</h1>
        <p className="mt-4 text-2xl font-semibold">Halaman Tidak Ditemukan</p>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Sepertinya halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[#FB6B00] text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>

      {/* Ornamen visual (optional) */}
      <div className="absolute bottom-8 right-8 w-32 h-32 bg-[#FB6B00]/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute top-12 left-16 w-24 h-24 bg-orange-400/30 rounded-full blur-2xl animate-pulse z-0" />
    </div>
  );
}
