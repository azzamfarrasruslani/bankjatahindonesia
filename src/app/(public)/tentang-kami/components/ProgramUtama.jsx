"use client";

import { motion } from "framer-motion";
import { Banknote, Store, HeartHandshake } from "lucide-react";

const programList = [
  {
    title: "Tabungan Jelantah",
    icon: <Banknote size={28} className="text-orange-500" />,
    desc: "Menabung minyak jelantah mulai 1 kg, bisa dijadikan E-Wallet. Tersedia Point Reward & Affiliate Marketing untuk penghasilan tambahan.",
  },
  {
    title: "Jual Beli Jelantah",
    icon: <Store size={28} className="text-orange-500" />,
    desc: "Transaksi jual-beli minyak jelantah dengan proses mudah dan harga kompetitif, tersedia di seluruh cabang Bank Jatah.",
  },
  {
    title: "Sedekah Jelantah",
    icon: <HeartHandshake size={28} className="text-orange-500" />,
    desc: "Hasil penjualan minyak jelantah disalurkan ke lembaga, rumah ibadah, dan masyarakat kurang mampu.",
  },
];

export default function ProgramUtama() {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <p className="text-orange-400 uppercase tracking-wider text-sm font-semibold">Program Utama</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Solusi Kami untuk Masa Depan yang Lebih Hijau
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {programList.map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Floating circle background */}
            <div className={`absolute -top-6 -left-6 w-16 h-16 rounded-full mix-blend-multiply opacity-30 pointer-events-none bg-orange-200`}></div>
            
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mb-4">
              {program.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-orange-600 mb-2">{program.title}</h3>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{program.desc}</p>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange-100 rounded-full mix-blend-multiply opacity-20 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
