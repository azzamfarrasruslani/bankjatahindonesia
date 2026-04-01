"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Sparkles } from "lucide-react";

export default function ArtikelHighlight({
  id,
  image,
  title,
  date,
  views = 0,
  index = 0,
}) {
  const altText = title ? `Cover: ${title}` : "Artikel Banner";
  const formattedDate = date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Baru Saja";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative w-full h-[400px] lg:h-[450px] rounded-[2.5rem] overflow-hidden group shadow-[0_15px_40px_rgba(249,115,22,0.1)] flex flex-col justify-end border-[3px] border-white/50 bg-gray-900"
    >
      <Link
        href={`/artikel/${id}`}
        className="absolute inset-0 z-20"
        aria-label={`Baca: ${title}`}
      />

      {/* Image Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image || "/placeholder.jpg"}
          alt={altText}
          fill
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-85"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority={index === 0}
        />
        {/* Cinematic Deep Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent transition-opacity duration-500" />
      </div>

      {/* Glow Hover Decor */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col pointer-events-none">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md text-[10px] font-black uppercase tracking-widest shadow-md">
            <Sparkles className="w-3 h-3 text-yellow-200" />
            Sorotan
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4 drop-shadow-lg group-hover:text-orange-300 transition-colors duration-300 line-clamp-3">
          {title || "Wawasan Baru Pengelolaan Lingkungan"}
        </h2>

        {/* Metadata Footer */}
        <div className="flex items-center gap-4 text-gray-300 text-xs font-medium pt-3 border-t border-white/20">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-orange-400" />
            <span>{views} Kali Dibaca</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
