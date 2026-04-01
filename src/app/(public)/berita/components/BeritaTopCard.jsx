"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

export default function BeritaTopCard({ berita }) {
  if (!berita) return null;

  const altText = berita.judul ? `Cover: ${berita.judul}` : "Headline Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden group shadow-[0_15px_50px_rgba(249,115,22,0.15)] flex flex-col justify-end border-[3px] border-white/50"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        <Image
          src={berita.gambar_url || "/placeholder.jpg"}
          alt={altText}
          fill
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-90"
          sizes="(max-width: 1280px) 100vw, 1200px"
          priority
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent transition-opacity duration-500" />
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/30 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Content Foreground */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 w-full md:w-4/5 lg:w-2/3">
        {/* Metadata Header */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500 text-white rounded-md text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md">
            Sorotan Utama
          </span>
          <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm font-medium border border-white/10 bg-black/20 backdrop-blur-md px-3 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>
              {berita.created_at
                ? new Date(berita.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Baru Saja"}
            </span>
          </div>
        </div>

        {/* Headline */}
        <Link href={`/berita/${berita.id}`} className="block group/title">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-6 drop-shadow-xl group-hover/title:text-orange-300 transition-colors duration-300 line-clamp-3">
            {berita.judul || "Breaking News Bank Jatah Indonesia"}
          </h2>
        </Link>

        {/* Author & CTA Button Flex Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
          {/* Author Area */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg border-2 border-white/10">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Penulis
              </span>
              <span className="text-sm font-bold text-white tracking-wide">
                {berita.penulis || "Redaksi BJI"}
              </span>
            </div>
          </div>

          {/* Read More Button */}
          <Link href={`/berita/${berita.id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-between gap-4 bg-white hover:bg-orange-50 text-gray-900 border border-transparent hover:border-orange-200 font-bold px-6 py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 group/btn"
            >
              <span className="uppercase tracking-widest text-[11px] sm:text-xs">
                Baca Artikel
              </span>
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-colors shadow-inner">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </div>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
