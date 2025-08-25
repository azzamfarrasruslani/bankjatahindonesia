"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Globe, Leaf, Users } from "lucide-react";

export default function TentangPageClient() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white text-gray-800 space-y-16">
      {/* Judul */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00] mb-4">
          Tentang Bank Jatah Indonesia
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami adalah inisiatif sosial-lingkungan yang mengubah limbah jelantah menjadi nilai ekonomi, sosial, dan ekologis.
        </p>
      </motion.div>

      {/* Gambar ilustrasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg"
      >
        <img
          src="/images/tentang-kami.png"
          alt="Ilustrasi Bank Jatah Indonesia"
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Visi Misi */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#FB6B00] mb-4 flex items-center gap-2">
            <Globe size={24} /> Visi
          </h2>
          <p className="text-gray-700">
            Menjadi gerakan nasional dalam pengelolaan minyak jelantah yang berdaya, inklusif, dan berkelanjutan untuk Indonesia hijau dan mandiri.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#FB6B00] mb-4 flex items-center gap-2">
            <HeartHandshake size={24} /> Misi
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Mengedukasi masyarakat tentang bahaya jelantah dan manfaatnya</li>
            <li>Membentuk jaringan relawan dan mitra di berbagai daerah</li>
            <li>Mendukung ekonomi rakyat melalui pengelolaan limbah</li>
            <li>Menyalurkan hasil jelantah ke program sosial dan lingkungan</li>
          </ul>
        </div>
      </motion.div>

      {/* Nilai-nilai */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-4 gap-8 text-center"
      >
        <div>
          <Leaf className="mx-auto text-[#FB6B00]" size={36} />
          <h3 className="font-bold mt-2">Ramah Lingkungan</h3>
        </div>
        <div>
          <Users className="mx-auto text-[#FB6B00]" size={36} />
          <h3 className="font-bold mt-2">Berbasis Komunitas</h3>
        </div>
        <div>
          <HeartHandshake className="mx-auto text-[#FB6B00]" size={36} />
          <h3 className="font-bold mt-2">Kemanusiaan</h3>
        </div>
        <div>
          <Globe className="mx-auto text-[#FB6B00]" size={36} />
          <h3 className="font-bold mt-2">Inklusif & Berkelanjutan</h3>
        </div>
      </motion.div>
    </section>
  );
}
