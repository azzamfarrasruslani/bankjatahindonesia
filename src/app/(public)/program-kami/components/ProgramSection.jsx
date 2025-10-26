"use client";

import Image from "next/image";
import { FaRegLightbulb } from "react-icons/fa6";

// Tidak ada perubahan pada props, destructuring, atau logika data
export default function ProgramSection({ program, isReverse }) {
  const { title, shortDescription, fullDescription, href, img } = program;

  const deskripsiUtama = fullDescription.split("Cara Kerja:")[0]?.trim();
  const caraKerjaList = fullDescription
    .split("Cara Kerja:")[1]
    ?.trim()
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.replace(/^\d+\.\s*/, ""));

  return (
    <div
      className={`flex flex-col md:flex-row gap-10 md:gap-12 items-start ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Gambar */}
      {/* Menambahkan sedikit gap yang lebih besar (gap-10 md:gap-12) */}
      <div className="md:w-5/12 w-full rounded-xl overflow-hidden shadow-lg"> 
        {/* Menambahkan shadow-lg untuk sedikit 'pop' seperti gambar */}
        <Image
          src={img}
          alt={title}
          width={600}
          height={600}
          className="w-full h-auto  object-cover" 
        />
      </div>

      {/* Konten */}
      {/* Meningkatkan space-y dari 4 menjadi 5 untuk 'spacious feel' */}
      <div className="md:w-7/12 space-y-5">
        
        {/* PERUBAHAN UTAMA: Hirarki Tipografi disesuaikan seperti gambar */}
        <div>
          {/* 1. "Eyebrow Title" menggunakan warna aksen Anda */}
          <span className="text-sm font-semibold uppercase tracking-wider text-[#FB6B00]">
            Program Aktif
          </span>
          
          {/* 2. Judul Utama: Dibuat lebih besar dan tebal dengan warna teks gelap */}
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {title}
          </h2>
        </div>
        {/* Akhir Perubahan Utama */}

        <p className="text-gray-700 text-base">{shortDescription}</p>
        {/* Menaikkan font dari text-sm ke text-base untuk keterbacaan */}

        {/* Garis pemisah, tidak perlu diubah */}
        <div className="border-b border-gray-200 w-16" />

        <div className="text-gray-600 text-base whitespace-pre-line leading-relaxed">
          {/* Menaikkan font dari text-sm ke text-base */}
          {deskripsiUtama}
        </div>

        {caraKerjaList && caraKerjaList.length > 0 && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <FaRegLightbulb className="text-[#FB6B00]" />
              <h3 className="text-base font-semibold text-gray-800">
                Cara Kerja
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-600 text-base space-y-1.5">
              {/* Menaikkan font dari text-sm ke text-base */}
              {caraKerjaList.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={href}
          className="inline-block mt-4 px-6 py-2.5 bg-[#FB6B00] text-white text-sm font-medium rounded-md hover:bg-[#e65c00] transition-colors"
          // Sedikit menambah padding (px-6, py-2.5) pada tombol
        >
          Ikuti Program Ini
        </a>
      </div>
    </div>
  );
}