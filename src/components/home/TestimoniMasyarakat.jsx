"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // pastikan file ini sudah ada

export default function TestimoniMasyarakat() {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const { data, error } = await supabase
          .from("testimoni")
          .select("nama, isi, rating, tanggal")
          .order("tanggal", { ascending: false });

        if (error) throw error;

        // tambahkan gambar default jika belum ada
        const withPhotos = data.map((item) => ({
          ...item,
          photo: "/images/tentang-kami.png",
        }));

        setTestimonies(withPhotos);
      } catch (err) {
        console.error("Gagal memuat testimoni:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, []);

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - visibleCount + testimonies.length) % testimonies.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount) % testimonies.length);
  };

  const visibleTestimonies = Array.from({ length: visibleCount }).map((_, i) => {
    const index = (startIndex + i) % testimonies.length;
    return testimonies[index];
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">Memuat testimoni...</div>
    );
  }

  if (testimonies.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Belum ada testimoni dari masyarakat.
      </div>
    );
  }

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
        {visibleTestimonies.map(
          (testi, i) =>
            testi && (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative flex flex-col items-center text-center rounded-3xl p-6 bg-gradient-to-tr from-white to-orange-50 border border-gray-100 shadow-md hover:shadow-2xl duration-300"
              >
            

                <span className="absolute top-4 left-4 text-6xl text-[#FB6B00] opacity-10">
                  “
                </span>

                <blockquote className="text-gray-700 text-md italic mb-3 leading-relaxed">
                  {testi.isi}
                </blockquote>

                <p className="font-bold text-[#FB6B00]">{testi.nama}</p>
                <p className="text-sm text-gray-500">
                  Rating: ⭐ {testi.rating}/5
                </p>
              </motion.div>
            )
        )}
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
