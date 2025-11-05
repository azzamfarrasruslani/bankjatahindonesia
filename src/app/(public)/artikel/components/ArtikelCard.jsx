"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";

export default function ArtikelCard({ id, image, title, date, views, excerpt, index, kategori }) {
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/artikel/${id}`} className="flex flex-col group transition" passHref>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300"
      >
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          {kategori && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              {kategori}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-xs text-gray-500">
              <span>{formattedDate}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{views} views</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 transition-colors group-hover:text-[#FB6B00]">
              {title}
            </h3>

            <div className="text-gray-700 text-sm sm:text-base line-clamp-3 sm:line-clamp-4 prose prose-sm max-w-none">
              {parse(excerpt)}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-[#FB6B00] font-semibold text-sm group-hover:underline">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
