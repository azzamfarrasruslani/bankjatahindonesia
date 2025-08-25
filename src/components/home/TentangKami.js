"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TentangKami() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-orange-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Gambar Ilustrasi dengan UI Menarik */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative w-full h-72 md:h-96 drop-shadow-xl"
        >
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[60px_10px_60px_10px] border-4 border-[#FB6B00]/20 shadow-xl">
            <Image
              src="/images/tentang-kami.png"
              alt="Tentang Kami"
              fill
              className="object-cover scale-110 transition-transform duration-500 ease-in-out hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* Teks Konten */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00] leading-tight">
              Tentang Kami
            </h2>
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#FB6B00] rounded-full"></div>
          </div>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            <strong>Bank Jatah Indonesia</strong> adalah inisiatif sosial dan lingkungan yang mengelola <strong>minyak jelantah</strong> untuk memberi nilai ekonomi, sosial, dan ekologis. Kami percaya bahwa limbah dapur bisa menjadi solusi masa depan — mulai dari tabungan, sedekah, hingga penghasilan.
          </p>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Berbasis komunitas dan berkelanjutan</li>
            <li>Mendorong ekonomi sirkular dan gaya hidup hijau</li>
            <li>Terbuka bagi individu, RT, komunitas, hingga sekolah</li>
          </ul>

          <Link
            href="/tentang"
            className="inline-block mt-4 px-6 py-3 rounded-full bg-[#FB6B00] text-white font-semibold text-sm shadow-md hover:bg-orange-600 transition"
          >
            Pelajari Lebih Lanjut
          </Link>
        </motion.div>
      </div>

      {/* Ornamen background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FB6B00]/10 rounded-full -z-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FB6B00]/20 rounded-full -z-10 blur-xl"></div>
    </section>
  );
}
