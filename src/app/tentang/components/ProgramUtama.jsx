"use client";

import { motion } from "framer-motion";
import { Banknote, Store, HeartHandshake } from "lucide-react";

const programList = [
  {
    title: "Tabungan Jelantah",
    icon: <Banknote size={36} className="text-[#FB6B00]" />,
    desc: "Menabung minyak jelantah mulai 1 kg dengan harga tinggi, hasilnya bisa dijadikan E-Wallet. Program ini juga menyediakan Point Reward & Affiliate Marketing untuk penghasilan tambahan.",
    color: "from-orange-100 to-orange-200",
  },
  {
    title: "Jual Beli Jelantah",
    icon: <Store size={36} className="text-[#FB6B00]" />,
    desc: "Transaksi jual-beli minyak jelantah dengan proses mudah dan harga kompetitif, tersedia di seluruh cabang Bank Jatah.",
    color: "from-yellow-100 to-yellow-200",
  },
  {
    title: "Sedekah Jelantah",
    icon: <HeartHandshake size={36} className="text-[#FB6B00]" />,
    desc: "Hasil penjualan minyak jelantah disalurkan ke lembaga, rumah ibadah, dan masyarakat kurang mampu.",
    color: "from-pink-100 to-pink-200",
  },
];

export default function ProgramUtama() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8 py-12 px-6 md:px-12"
    >
      {programList.map((program, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className={`bg-gradient-to-br ${program.color} p-6 rounded-2xl shadow-md transform hover:scale-105 hover:shadow-lg transition`}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-white/30 rounded-full mb-4">
            {program.icon}
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-800">
            {program.title}
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {program.desc}
          </p>
        </motion.div>
      ))}
    </motion.section>
  );
}
