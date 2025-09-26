"use client";

import Image from "next/image";
import { FaRegLightbulb } from "react-icons/fa6"; // icon contoh

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
      className={`flex flex-col md:flex-row gap-10 items-start ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Gambar */}
      <div className="md:w-5/12 w-full">
        <Image
          src={img}
          alt={title}
          width={600}
          height={400}
          className="rounded-xl shadow-lg w-full  object-cover md:object-contain"
        />
      </div>

      {/* Konten */}
      <div className="md:w-7/12 space-y-5">
        {/* Judul dan Badge */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-[#FB6B00]">{title}</h2>
          <span className="bg-orange-100 text-[#FB6B00] px-2 py-0.5 rounded text-xs font-medium">
            Program Aktif
          </span>
        </div>

        {/* Deskripsi Singkat */}
        <p className="text-gray-700 text-sm">{shortDescription}</p>

        {/* Divider */}
        <div className="border-b border-gray-200 w-16" />

        {/* Deskripsi Utama */}
        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {deskripsiUtama}
        </div>

        {/* Cara Kerja */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mt-4 mb-2">
            <FaRegLightbulb className="text-[#FB6B00]" />
            <h3 className="text-md font-semibold text-gray-800">Cara Kerja</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {caraKerjaList?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Tombol CTA */}
        <a
          href={href}
          className="inline-block mt-4 px-4 py-2 bg-[#FB6B00] text-white text-sm font-medium rounded hover:bg-[#e65c00] transition"
        >
          Ikuti Program Ini
        </a>
      </div>
    </div>
  );
}
