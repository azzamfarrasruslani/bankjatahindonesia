"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonies = [
  {
    name: "Ayu Wulandari",
    quote:
      "Saya bisa bayar listrik dari jelantah! Program ini sangat membantu ekonomi keluarga saya.",
    location: "Surabaya, Jawa Timur",
    photo: "/images/tentang-kami.png",
  },
  {
    name: "Bapak Ridwan",
    quote:
      "Minyak bekas tidak lagi jadi limbah, tapi jadi tabungan buat anak sekolah.",
    location: "Padang, Sumatera Barat",
    photo: "/images/tentang-kami.png",
  },
  {
    name: "Lina Putri",
    quote:
      "Sedekah jelantah bikin saya merasa lebih bermanfaat untuk masyarakat.",
    location: "Depok, Jawa Barat",
    photo: "/images/tentang-kami.png",
  },
  {
    name: "Siti Rahma",
    quote:
      "Awalnya ragu, tapi ternyata hasil dari jelantah bisa bantu biaya dapur tiap bulan!",
    location: "Bandung, Jawa Barat",
    photo: "/images/tentang-kami.png",
  },
  {
    name: "Pak Hendra",
    quote:
      "Kami ikut program ini di lingkungan RT, dan hasilnya luar biasa! Kompak dan bermanfaat.",
    location: "Tangerang, Banten",
    photo: "/images/tentang-kami.png",
  },
];

export default function TestimoniMasyarakat() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - visibleCount + testimonies.length) % testimonies.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount) % testimonies.length);
  };

  const visibleTestimonies = Array.from({ length: visibleCount }).map(
    (_, i) => {
      const index = (startIndex + i) % testimonies.length;
      return testimonies[index];
    }
  );

  return (
    <section className="w-full bg-gradient-to-b from-white via-orange-50 to-white py-20 px-6 sm:px-10 lg:px-24 overflow-hidden">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#FB6B00]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Testimoni Masyarakat
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-3 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Cerita nyata dari pengguna program Bank Jatah Indonesia yang
          menginspirasi dan berdampak.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          hidden: { opacity: 0 },
        }}
      >
        {visibleTestimonies.map((testi, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative flex flex-col items-center text-center rounded-3xl p-6 bg-gradient-to-tr from-white to-orange-50 border border-gray-100 shadow-md hover:shadow-2xl duration-300"
          >
            <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-[#FB6B00] transition">
              <Image
                src={testi.photo}
                alt={testi.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            <span className="absolute top-4 left-4 text-6xl text-[#FB6B00] opacity-10">
              “
            </span>

            <blockquote className="text-gray-700 text-md italic mb-3 leading-relaxed">
              {testi.quote}
            </blockquote>

            <p className="font-bold text-[#FB6B00]">{testi.name}</p>
            <p className="text-sm text-gray-500">{testi.location}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigasi Tombol */}
      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full shadow-md bg-white border border-[#FB6B00] text-[#FB6B00] hover:bg-[#FB6B00]/10 transition"
          aria-label="Sebelumnya"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full shadow-md bg-white border border-[#FB6B00] text-[#FB6B00] hover:bg-[#FB6B00]/10 transition"
          aria-label="Berikutnya"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
