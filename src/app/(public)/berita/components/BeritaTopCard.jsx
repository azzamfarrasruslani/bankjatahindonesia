"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BeritaTopCard({ berita }) {
  const altText = berita?.judul
    ? `Gambar berita: ${berita.judul}`
    : "Gambar berita Bank Jatah Indonesia";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-lg overflow-hidden border border-orange-100"
    >
      {/* Gambar utama dengan overlay */}
      <div className="relative h-96 w-full">
        <Image
          src={berita?.gambar_url || "/placeholder.jpg"}
          alt={altText}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Overlay gradien dan konten teks + tombol */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#FB6B00]/20 via-[#FB6B00]/30 to-transparent p-8">
          <div className="mb-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
              {berita?.judul || "Judul Berita"}
            </h2>
            <div className="flex items-center text-orange-100 text-sm space-x-4">
              <span>
                {berita?.created_at
                  ? new Date(berita.created_at).toLocaleDateString("id-ID")
                  : "Tanggal tidak tersedia"}
              </span>
              <span>{berita?.penulis || "Admin"}</span>
            </div>
          </div>

          {/* Tombol berada di atas gambar */}
          <div>
            <Link
              href={`/berita/${berita?.id}`}
              className="relative inline-flex items-center justify-center px-6 py-2.5 
                         font-semibold text-sm text-white tracking-wide
                         bg-gradient-to-r from-[#FB6B00] to-[#ff8c32]
                         rounded-full shadow-md hover:shadow-lg hover:scale-105
                         transition-all duration-300 ease-out
                         before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:opacity-0 hover:before:opacity-100"
            >
              <span className="relative z-10">Baca Selengkapnya</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
