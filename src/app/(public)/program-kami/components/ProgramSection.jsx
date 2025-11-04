"use client";

import Image from "next/image";
import { FaRegLightbulb } from "react-icons/fa6";

export default function ProgramSection({ program, isReverse }) {
  const { title, status, shortDescription, fullDescription, steps, href, img } =
    program;

  return (
    <div
      className={`flex flex-col md:flex-row gap-10 md:gap-12 items-start ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Gambar */}
      <div className="md:w-5/12 w-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src={img}
          alt={title}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Konten */}
      <div className="md:w-7/12 space-y-5">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-[#FB6B00]">
            {status || "Program Aktif"}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">{title}</h2>
        </div>

        <p className="text-gray-700 text-base">{shortDescription}</p>

        <div className="border-b border-gray-200 w-16" />

        <div className="text-gray-600 text-base whitespace-pre-line leading-relaxed">
          {fullDescription}
        </div>

        {/* List detail langkah-langkah (details[]) */}
        {steps && Array.isArray(steps) && steps.length > 0 && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <FaRegLightbulb className="text-[#FB6B00]" />
              <h3 className="text-base font-semibold text-gray-800">
                Cara Kerja
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-600 text-base space-y-1.5">
              {steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={href}
          className="inline-block mt-4 px-6 py-2.5 bg-[#FB6B00] text-white text-sm font-medium rounded-md hover:bg-[#e65c00] transition-colors"
        >
          Ikuti Program Ini
        </a>
      </div>
    </div>
  );
}
