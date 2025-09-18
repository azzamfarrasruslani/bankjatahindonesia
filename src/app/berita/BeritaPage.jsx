"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const beritaList = [
  {
    id: 1,
    title: "Bank Jatah Gandeng UMKM untuk Kelola Jelantah",
    date: "27 Agustus 2025",
    category: "Program",
    excerpt:
      "Bank Jatah Indonesia meluncurkan kerja sama strategis dengan UMKM dalam mengelola minyak jelantah menjadi energi terbarukan.",
    image: "/images/berita1.jpg",
    views: 1200,
    isTop: true, // berita utama
  },
  {
    id: 2,
    title: "Tabungan Jelantah Resmi Hadir di 5 Kota",
    date: "20 Agustus 2025",
    category: "Inovasi",
    excerpt:
      "Program Tabungan Jelantah kini hadir di Jakarta, Bandung, Surabaya, Yogyakarta, dan Makassar sebagai bentuk inovasi keuangan hijau.",
    image: "/images/berita2.jpg",
    views: 950,
  },
  {
    id: 3,
    title: "Donasi Jelantah untuk Panti Asuhan Meningkat",
    date: "15 Agustus 2025",
    category: "Sosial",
    excerpt:
      "Partisipasi masyarakat dalam Sedekah Jelantah meningkat tajam. Kini sudah disalurkan ke lebih dari 30 lembaga sosial.",
    image: "/images/berita3.jpg",
    views: 780,
  },
];

export default function BeritaPage() {
  const topNews = beritaList.find((b) => b.isTop);
  const otherNews = beritaList.filter((b) => !b.isTop);

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FB6B00] flex items-center justify-center gap-2">
          <span>📰</span> Berita Terbaru
        </h1>

        {/* Garis dekoratif */}
        <div className="mt-2 w-24 h-1 mx-auto bg-gradient-to-r from-[#FB6B00] to-orange-400 rounded-full"></div>

        {/* Subjudul */}
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Ikuti informasi terbaru seputar program, inovasi, dan kegiatan Bank
          Jatah Indonesia.
        </p>
      </motion.div>

      {/* Top News */}
      {topNews && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-200"
        >
          <div className="relative h-80 w-full">
            <Image
              src={topNews.image}
              alt={topNews.title}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#FB6B00] text-white text-xs font-semibold px-2 py-1 rounded-full">
              {topNews.category}
            </span>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                {topNews.title}
              </h2>
              <div className="flex items-center text-gray-300 text-sm space-x-4">
                <span>{topNews.date}</span>
                <span>{topNews.views} views</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid Berita Lain */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherNews.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 bg-white border border-gray-200"
          >
            <div className="relative h-56 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#FB6B00] text-white text-xs font-semibold px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex justify-between text-gray-500 text-xs">
                <span>{item.date}</span>
                <span>{item.views} views</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.excerpt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
