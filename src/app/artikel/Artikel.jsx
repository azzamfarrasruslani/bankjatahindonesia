"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ArtikelPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="relative h-60 md:h-72 w-full overflow-hidden">
        <Image
          src="/images/artikel-header.jpg" // Ganti dengan gambar header kamu
          alt="Header Artikel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md">
            Artikel & Informasi
          </h1>
        </div>
      </div>

      {/* Section: Artikel Teratas */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 px-6 sm:px-12 lg:px-24"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#FB6B00] mb-8">
          Artikel Teratas
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition"
            >
              <Image
                src={`/images/artikel-${item}.jpg`} // Ganti dengan gambar dummy
                alt={`Artikel ${item}`}
                width={600}
                height={400}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Manfaat Jelantah untuk Lingkungan
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  Jelantah tak sekadar limbah, tapi potensi ekonomi dan solusi
                  lingkungan jika dikelola dengan tepat. Simak penjelasan lengkapnya.
                </p>
                <button className="mt-2 text-sm text-[#FB6B00] hover:underline font-medium">
                  Baca Selengkapnya →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
