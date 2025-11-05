"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function GaleriPage() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Ambil data dari Supabase
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const { data, error } = await supabase
          .from("galeri")
          .select("id, judul, deskripsi, gambar_url, kategori, tanggal")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setGaleri(data);
      } catch (err) {
        console.error("Gagal mengambil data galeri:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  // 🧱 Skeleton Loading
  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto text-center mb-12 mt-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FB6B00]">
            Galeri Bank Jatah Indonesia
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Lihat momen dan kegiatan Bank Jatah Indonesia yang mendukung pengelolaan minyak jelantah, edukasi lingkungan, dan pemberdayaan masyarakat.
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="bg-gray-300 h-64 sm:h-56 lg:h-60 w-full"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 🖼️ Galeri tampil setelah data dimuat
  return (
    <section className="py-24 px-4 sm:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-12 mt-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FB6B00]">
          Galeri Bank Jatah Indonesia
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Lihat momen dan kegiatan Bank Jatah Indonesia yang mendukung pengelolaan minyak jelantah, edukasi lingkungan, dan pemberdayaan masyarakat.
        </p>
      </div>

      {/* Grid Galeri */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {galeri.map((item, i) => (
          <motion.div
            key={item.id}
            className="relative cursor-pointer overflow-hidden rounded-3xl shadow-lg border border-transparent transition-all duration-300"
            onClick={() => setSelectedImage(item)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={item.gambar_url}
              alt={item.judul}
              width={400}
              height={400}
              className="object-cover w-full h-64 sm:h-56 lg:h-60 rounded-3xl"
            />

            {/* Overlay caption muncul saat hover */}
            <motion.div
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white p-4 rounded-3xl opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-sm sm:text-base font-medium">
                {item.judul}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-11/12 max-w-2xl">
            <Image
              src={selectedImage.gambar_url}
              alt={selectedImage.judul}
              width={800}
              height={600}
              className="object-contain rounded-xl shadow-2xl"
            />
            <p className="text-white text-center mt-2">{selectedImage.judul}</p>
            <button
              className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-orange-400 transition"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
