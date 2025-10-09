"use client";

import { motion } from "framer-motion";
import { Users, Home, Factory } from "lucide-react";

export default function TargetPasar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-white p-8 md:p-12 rounded-2xl shadow-md mb-16 border border-gray-100"
    >
      {/* Judul */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#FB6B00] mb-6 text-center md:text-left">
        Target Pasar
      </h2>

      {/* Konten grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Industri Pengolahan Makanan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#FB6B00]/10 p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <Factory className="text-[#FB6B00]" size={32} />
            <h3 className="text-lg font-semibold text-gray-800">Industri Makanan</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Sebanyak <strong className="text-[#FB6B00]">714.296,6 kilo liter</strong> jelantah dihasilkan dari industri pengolahan makanan setiap tahunnya, menjadi potensi besar untuk didaur ulang secara ekonomi dan lingkungan.
          </p>
        </motion.div>

        {/* Hotel, Restoran, Kafe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-[#FB6B00]/10 p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <Home className="text-[#FB6B00]" size={32} />
            <h3 className="text-lg font-semibold text-gray-800">Hotel, Restoran & Kafe</h3>
          </div>
          <p className="text-gray-700 text-sm">
            <strong className="text-[#FB6B00]">218.871,7 kilo liter</strong> berasal dari sektor hospitality seperti hotel, restoran, dan kafe, yang sangat potensial menjadi mitra program pengumpulan minyak jelantah.
          </p>
        </motion.div>

        {/* Rumah Tangga & UMKM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#FB6B00]/10 p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <Users className="text-[#FB6B00]" size={32} />
            <h3 className="text-lg font-semibold text-gray-800">UMKM & Rumah Tangga</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Rumah tangga dan UMKM adalah sumber utama minyak jelantah dari aktivitas sehari-hari. Kami mendorong partisipasi aktif mereka dalam program <em>tabungan jelantah</em> dan edukasi lingkungan.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
