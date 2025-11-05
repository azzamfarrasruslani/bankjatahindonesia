"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";

export default function ArtikelHighlight({ id, image, title, date, views = 0 }) {
  const altText = title ? `Gambar artikel: ${title}` : "Gambar artikel";
  const formattedDate = date
    ? new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    : "Tanggal tidak tersedia";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 rounded-2xl shadow-lg overflow-hidden border border-orange-100 bg-white group"
    >
      <div className="relative h-96 w-full overflow-hidden rounded-2xl">
        <Image
          src={image || "/placeholder.jpg"}
          alt={altText}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="100vw"
          priority
        />

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 via-black/30 to-transparent p-8">
          <div className="mb-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg transition-colors duration-300 group-hover:text-orange-200">
              {title}
            </h2>

            <div className="flex items-center text-orange-100 text-sm space-x-4">
              <span>{formattedDate}</span>
              <span className="flex items-center gap-1">
                <AiFillEye className="inline-block w-4 h-4" /> {views}
              </span>
            </div>
          </div>

          <div>
            <Link
              href={`/artikel/${id}`}
              className="relative inline-flex items-center justify-center px-6 py-2.5 
                         font-semibold text-sm text-white tracking-wide
                         bg-gradient-to-r from-[#FB6B00] to-[#ff8c32]
                         rounded-full shadow-lg hover:shadow-xl hover:scale-105
                         transition-all duration-300 ease-out"
            >
              <span className="relative z-10">Baca Selengkapnya</span>
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
