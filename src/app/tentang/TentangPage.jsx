"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  Globe,
  Leaf,
  Users,
  Banknote,
  Store,
} from "lucide-react";

import TargetPasar from "@/components/tentang/TargetPasar";
import TimKami from "@/components/tentang/TimKami";
import SejarahVisiMisi from "@/components/tentang/SejarahVisiMisi";



export default function TentangPage() {
  return (
    <section className="bg-white text-gray-800">
      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
        {/* Background image */}
        <img
          src="/images/tentang-kami.png"
          alt="Tentang Bank Jatah Indonesia"
          className="w-full h-full object-cover brightness-50 scale-105 transition-transform duration-700 hover:scale-110"
        />

        {/* Gradient overlay untuk efek dramatis */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>

        {/* Elemen dekoratif floating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-10 left-10 w-16 h-16 rounded-full bg-orange-500/40 blur-3xl animate-pulse"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-yellow-400/30 blur-3xl animate-pulse"
        ></motion.div>

        {/* Judul utama */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-xl"
          >
            Tentang Bank Jatah Indonesia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 text-white text-lg md:text-xl max-w-2xl drop-shadow-md"
          >
            Memahami pentingnya pengelolaan minyak jelantah untuk lingkungan dan
            masyarakat. Mari bergabung dalam program kami!
          </motion.p>
        </div>
      </div>

      {/* Konten */}
      <div className="px-6 sm:px-12 lg:px-24 py-16 space-y-16">
        {/* Sejarah */}
        <SejarahVisiMisi />

        {/* Produk Utama / Program Bank Jatah */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 py-12 px-6 md:px-12"
        >
          {[
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
          ].map((program, index) => (
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

        {/* Target Pasar */}
        <TargetPasar />

        {/* Nilai-Nilai */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            {
              icon: <Leaf size={36} />,
              title: "Ramah Lingkungan",
              color: "from-green-100 to-green-200",
            },
            {
              icon: <Users size={36} />,
              title: "Berbasis Komunitas",
              color: "from-yellow-100 to-yellow-200",
            },
            {
              icon: <HeartHandshake size={36} />,
              title: "Kemanusiaan",
              color: "from-pink-100 to-pink-200",
            },
            {
              icon: <Globe size={36} />,
              title: "Berkelanjutan",
              color: "from-blue-100 to-blue-200",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white/30 rounded-full mb-3 animate-bounce">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Tim Kami */}
       <TimKami />
      </div>
    </section>
  );
}
