"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const galleryImages = [
  { src: "/images/galeri1.jpg", caption: "Kegiatan menabung minyak jelantah" },
  { src: "/images/galeri2.jpg", caption: "Workshop edukasi lingkungan" },
  { src: "/images/galeri3.jpg", caption: "Program sedekah jelantah" },
  { src: "/images/galeri4.jpg", caption: "Kegiatan komunitas mitra Bank Jatah" },
  { src: "/images/galeri5.jpg", caption: "Kegiatan kampanye lingkungan" },
  { src: "/images/galeri6.jpg", caption: "Foto dokumentasi event Bank Jatah" },
];

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState(null);

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
  {galleryImages.map((item, i) => (
    <motion.div
      key={i}
      className="relative cursor-pointer overflow-hidden rounded-3xl shadow-lg border border-transparent transition-all duration-300"
      onClick={() => setSelectedImage(item)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      whileHover={{ scale: 1.03, shadow: "0 20px 30px rgba(0,0,0,0.2)" }}
    >
      <Image
        src={item.src}
        alt={item.caption}
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
        <p className="text-center text-sm sm:text-base font-medium">{item.caption}</p>
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
          <div className="relative w-11/12 max-w-3xl">
            <Image
              src={selectedImage.src}
              alt={selectedImage.caption}
              width={800}
              height={600}
              className="object-contain rounded-xl shadow-2xl"
            />
            <p className="text-white text-center mt-2">{selectedImage.caption}</p>
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
