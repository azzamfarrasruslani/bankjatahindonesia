"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

export default function BeritaCard({ berita, index }) {
  if (!berita) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15, ease: "easeOut" }}
      className="group relative flex flex-col bg-white border border-gray-100 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] hover:border-orange-200 transition-all duration-500 overflow-hidden h-full"
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      {/* Thumbnail Header */}
      <Link
        href={`/berita/${berita.id}`}
        className="relative block h-56 w-full overflow-hidden shrink-0 z-10 m-3 w-[calc(100%-1.5rem)] rounded-[1.2rem]"
      >
        <Image
          src={berita.gambar_url || "/placeholder.jpg"}
          alt={berita.judul}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Subtle Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Category Pill Over Image */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 border border-white/50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">
          Berita
        </div>
      </Link>

      {/* Body Content */}
      <div className="flex flex-col flex-grow p-6 relative z-10">
        {/* Dates and Author Row */}
        <div className="flex flex-wrap items-center justify-between text-xs font-medium text-gray-400 mb-4 gap-2">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>
              {berita.created_at
                ? new Date(berita.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Hari Ini"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-gray-300" />
            <span>{berita.penulis || "Admin"}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/berita/${berita.id}`} className="block mb-3 group/link">
          <h3 className="text-xl font-black text-gray-900 leading-snug line-clamp-2 group-hover/link:text-orange-500 transition-colors">
            {berita.judul}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3 mb-6 flex-grow border-l-2 border-orange-100 pl-4 py-1">
          {berita.isi
            ? berita.isi.replace(/<[^>]+>/g, "").slice(0, 150) + "..."
            : "Simak selengkapnya dalam artikel berikut ini."}
        </p>

        {/* CTA Link Area */}
        <div className="pt-4 border-t border-gray-100 mt-auto">
          <Link
            href={`/berita/${berita.id}`}
            className="flex items-center justify-between group/btn w-full"
          >
            <span className="text-xs font-bold text-gray-900 uppercase tracking-widest group-hover/btn:text-orange-600 transition-colors">
              Baca Selengkapnya
            </span>
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-colors duration-300 border border-orange-100 group-hover/btn:border-transparent">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 -rotate-45 group-hover/btn:rotate-0" />
            </div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
