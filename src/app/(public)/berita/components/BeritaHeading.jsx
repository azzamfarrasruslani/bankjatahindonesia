"use client";
import { motion } from "framer-motion";

export default function BeritaHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 mt-24"
    >
      {/* Judul Utama */}
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 flex items-center justify-center gap-3 tracking-tight leading-snug">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-[#FB6B00] text-4xl md:text-5xl"
        >
          📰
        </motion.span>
        <span className="bg-gradient-to-r from-[#FB6B00] to-orange-400 bg-clip-text text-transparent">
          Berita Terbaru
        </span>
      </h1>

      {/* Garis Dekoratif */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-3 w-28 h-1 mx-auto origin-left bg-gradient-to-r from-[#FB6B00] to-yellow-400 rounded-full"
      />

      {/* Subjudul */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
      >
        Ikuti informasi terkini seputar <span className="font-semibold text-[#FB6B00]">program</span>,{" "}
        <span className="font-semibold text-[#FB6B00]">inovasi</span>, dan{" "}
        <span className="font-semibold text-[#FB6B00]">kegiatan sosial</span> yang digagas oleh Bank Jatah Indonesia.
      </motion.p>
    </motion.div>
  );
}
