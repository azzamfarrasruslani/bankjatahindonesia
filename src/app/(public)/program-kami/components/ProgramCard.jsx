"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProgramCard({ program }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={program.img}
          alt={program.title}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-[#FB6B00]">{program.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{program.shortDescription}</p>
        </div>
        <Link
          href={program.href}
          className="mt-2 px-4 py-2 bg-[#FB6B00] text-white text-sm font-medium rounded-md hover:bg-[#e65c00] transition-colors text-center"
        >
          Lihat Selengkapnya →
        </Link>
      </div>
    </div>
  );
}
