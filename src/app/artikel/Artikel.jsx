"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const artikelList = [
  {
    id: 1,
    title: "Manfaat Jelantah untuk Lingkungan",
    date: "27 Agustus 2025",
    category: "Lingkungan",
    excerpt:
      "Jelantah tak sekadar limbah, tapi potensi ekonomi dan solusi lingkungan jika dikelola dengan tepat. Simak penjelasan lengkapnya.",
    image: "/images/artikel-1.jpg",
    views: 1200,
  },
  {
    id: 2,
    title: "Tabungan Jelantah: Inovasi Keuangan Hijau",
    date: "20 Agustus 2025",
    category: "Inovasi",
    excerpt:
      "Program Tabungan Jelantah hadir untuk memudahkan masyarakat menabung minyak jelantah sambil mendapat manfaat ekonomi.",
    image: "/images/artikel-2.jpg",
    views: 950,
  },
  {
    id: 3,
    title: "Sedekah Jelantah untuk Panti Asuhan",
    date: "15 Agustus 2025",
    category: "Sosial",
    excerpt:
      "Partisipasi masyarakat dalam Sedekah Jelantah meningkat, kini sudah disalurkan ke lebih dari 30 lembaga sosial.",
    image: "/images/artikel-3.jpg",
    views: 780,
  },
];

export default function ArtikelPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="relative h-60 md:h-72 w-full overflow-hidden">
        <Image
          src="/images/artikel-header.jpg"
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

      {/* Section: Grid Card */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 px-6 sm:px-12 lg:px-24"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artikelList.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition"
            >
              {/* Thumbnail */}
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Konten */}
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.views} views</span>
                    <span>•</span>
                    <span className="bg-[#FB6B00] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#FB6B00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-4">
                  <button className="text-[#FB6B00] font-semibold text-sm hover:underline">
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
