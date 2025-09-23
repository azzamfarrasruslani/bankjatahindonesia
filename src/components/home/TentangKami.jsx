"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TentangKami() {
  return (
    <section className="py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Kiri: Konten Teks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Subheading */}
          <div>
            <p className="text-[#FB6B00] text-xl font-bold uppercase tracking-wide">
              Tentang Kami
            </p>
            <div className="w-10 h-1 bg-[#FB6B00] mt-1 mb-4 rounded-full"></div>
          </div>

          {/* Judul */}
          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-900">
            Dari Limbah Jadi Berkah, Demi Masa Depan yang Lebih Hijau
          </h2>

          {/* Deskripsi */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Bank Jatah Indonesia</strong> adalah inisiatif sosial dan
            lingkungan yang mengelola minyak jelantah untuk memberi nilai
            ekonomi, sosial, dan ekologis. Kami percaya bahwa limbah dapur bisa
            menjadi solusi masa depan — mulai dari tabungan, sedekah, hingga
            penghasilan.
          </p>

          {/* Tombol */}
          <Link
            href="/tentang"
            className="inline-flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition duration-200 shadow-md"
          >
            Pelajari Lebih Lanjut
            <span className="text-lg">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-[600px] h-[500px] rounded-4xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/tentang-kami.png"
            alt="Bank Jatah Tentang Kami"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
