"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TentangKami() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Kiri: Konten Teks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 space-y-6"
        >
          <div>
            <p className="text-[#FB6B00] text-xl font-bold uppercase tracking-wide">
              Tentang Kami
            </p>
            <div className="w-10 h-1 bg-[#FB6B00] mt-1 mb-4 rounded-full"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-900">
            Dari Limbah Jadi Berkah, Demi Masa Depan yang Lebih Hijau
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <strong>Bank Jatah Indonesia</strong> adalah inisiatif sosial dan
            lingkungan yang mengelola minyak jelantah untuk memberi nilai
            ekonomi, sosial, dan ekologis. Kami percaya bahwa limbah dapur bisa
            menjadi solusi masa depan — mulai dari tabungan, sedekah, hingga
            penghasilan.
          </p>

          <Link
            href="/tentang"
            className="inline-flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition duration-200 shadow-md"
          >
            Pelajari Lebih Lanjut
            <span className="text-lg">→</span>
          </Link>
        </motion.div>

        {/* Kanan: Gambar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/tentang-kami.png"
            alt="Bank Jatah Tentang Kami"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
