"use client";

import { motion } from "framer-motion";
import { Flame, Target, Lightbulb } from "lucide-react";

export default function SejarahVisiMisi() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="px-6 md:px-12 py-16 bg-white"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-4">
          Sejarah, Visi & Misi Bank Jatah
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Mengenal lebih dalam tentang latar belakang berdirinya Bank Jatah
          Indonesia dan tujuan utamanya dalam membangun solusi berbasis
          lingkungan dan sosial.
        </p>
      </div>

      {/* SEJARAH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Flame className="text-[#FB6B00]" size={28} />
          <h3 className="text-2xl font-semibold text-gray-800">
            Sejarah Singkat
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Bank Jatah berawal dari dampak{" "}
          <strong className="text-[#FB6B00]">Pandemi Covid-19</strong> pada
          tahun 2021, yang menyebabkan banyak usaha mengalami kerugian. Melalui
          inisiatif pemuda Karang Taruna, lahirlah ide menciptakan peluang usaha
          sekaligus mengedukasi masyarakat mengenai pentingnya pengelolaan
          limbah jelantah.
          <br />
          <br />
          Tepat pada <strong className="text-[#FB6B00]">28 Agustus 2021</strong>
          , Bank Jatah resmi diluncurkan sebagai gerakan sosial-lingkungan yang
          mengubah limbah jelantah menjadi nilai ekonomi dan sosial. Kami
          menghadirkan solusi seperti <em>Tabungan Jelantah</em> dan produk{" "}
          <em>Jual Beli Jelantah</em> untuk masyarakat dan pelaku UMKM.
        </p>
      </motion.div>

      {/* VISI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-[#FB6B00]/10 p-6 md:p-8 rounded-xl shadow-md mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Target className="text-[#FB6B00]" size={28} />
          <h3 className="text-2xl font-semibold text-gray-800">Visi</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Menjadi pusat pengelolaan limbah jelantah yang inovatif, ramah
          lingkungan, dan bermanfaat secara sosial-ekonomi untuk masyarakat
          Indonesia.
        </p>
      </motion.div>

      {/* MISI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md"
      >
        <div className="flex items-center gap-4 mb-4">
          <Lightbulb className="text-[#FB6B00]" size={28} />
          <h3 className="text-2xl font-semibold text-gray-800">Misi</h3>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
          <li>
            Mengedukasi masyarakat tentang pentingnya pengelolaan limbah
            jelantah.
          </li>
          <li>
            Menyediakan solusi pengumpulan, tabungan, dan jual-beli minyak
            jelantah.
          </li>
          <li>
            Mendukung UMKM dan rumah tangga untuk mendapatkan nilai ekonomi dari
            limbah.
          </li>
          <li>Mendorong gerakan sosial-lingkungan yang berkelanjutan.</li>
        </ul>
      </motion.div>
    </motion.section>
  );
}
