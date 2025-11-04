"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BeritaCard({ berita, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 bg-white border border-gray-200"
    >
      <Link href={`/berita/${berita.id}`}>
        <div className="relative h-56 w-full">
          <Image
            src={berita.gambar_url || "/placeholder.jpg"}
            alt={berita.judul}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-6 space-y-3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-gray-500 text-xs">
            <span>{new Date(berita.created_at).toLocaleDateString("id-ID")}</span>
            <span>{berita.penulis || "Admin"}</span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mt-1">{berita.judul}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {berita.isi.replace(/<[^>]+>/g, "").slice(0, 120)}...
          </p>
        </div>

        {/* Tombol Baca Selengkapnya */}
        <div className="mt-4">
          <Link
            href={`/berita/${berita.id}`}
            className="inline-block text-sm font-medium text-[#FB6B00]  transition-colors border border-[#FB6B00]  rounded-lg px-4 py-2"
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
