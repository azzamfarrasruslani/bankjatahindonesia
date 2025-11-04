"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function ArtikelCard({ id, image, title, date, views, excerpt, index, kategori }) {
  // Format tanggal jadi misal: 23 Jun 2025
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition flex flex-col"
    >
      {/* Gambar */}
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        {kategori && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {kategori}
          </span>
        )}
      </div>

      {/* Konten */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-gray-500">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{views} views</span>
          </div>

          {/* Judul */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#FB6B00] transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <div className="text-gray-700 text-sm line-clamp-4">
            {parse(excerpt.length > 150 ? excerpt.slice(0, 150) + "..." : excerpt)}
          </div>
        </div>

        {/* Tombol Baca Selengkapnya */}
        <div className="mt-4">
          <Link
            href={`/artikel/${id}`}
            className="text-[#FB6B00] font-semibold text-sm hover:underline"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
