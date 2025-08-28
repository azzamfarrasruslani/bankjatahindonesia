"use client";

import { motion } from "framer-motion";

export default function SejarahVisiMisi() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative py-12 px-6 md:px-12 bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-12 text-center md:text-left drop-shadow-sm">
        Awal Mula, Sejarah & Visi Misi
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sisi kiri: Sejarah */}
        <div className="flex-1 space-y-8">
          {/* Milestone 1 */}
          <div className="relative pl-10 md:pl-16">
            <span className="absolute left-0 top-1 w-5 h-5 bg-[#FB6B00] rounded-full shadow-lg"></span>
            <div className="border-l-2 border-[#FB6B00] absolute left-2 top-6 h-full"></div>
            <p className="text-gray-700 leading-relaxed">
              BANK JATAH berawal dari dampak <strong>Pandemi Covid-19</strong>{" "}
              pada tahun 2021, yang menyebabkan banyak usaha mengalami
              kerugian. Melalui inisiatif pemuda Karang Taruna, lahirlah ide
              menciptakan peluang usaha sekaligus mengedukasi masyarakat
              mengenai pentingnya pengelolaan limbah jelantah.
            </p>
          </div>

          {/* Milestone 2 */}
          <div className="relative pl-10 md:pl-16">
            <span className="absolute left-0 top-1 w-5 h-5 bg-[#FB6B00] rounded-full shadow-lg"></span>
            <p className="text-gray-700 leading-relaxed">
              Tepat pada <strong>28 Agustus 2021</strong>, Bank Jatah resmi
              diluncurkan sebagai gerakan sosial-lingkungan yang mengubah
              limbah jelantah menjadi nilai ekonomi dan sosial. Kami menghadirkan
              solusi seperti tabungan minyak jelantah dan produk jual-beli
              jelantah untuk masyarakat dan pelaku UMKM.
            </p>
          </div>
        </div>

        {/* Sisi kanan: Visi & Misi */}
        <div className="flex-1 bg-[#FB6B00]/10 p-6 rounded-2xl shadow-inner space-y-6">
          <h3 className="text-2xl font-bold text-[#FB6B00]">Visi</h3>
          <p className="text-gray-800 leading-relaxed">
            Menjadi pusat pengelolaan limbah jelantah yang inovatif, ramah
            lingkungan, dan bermanfaat secara sosial-ekonomi untuk masyarakat
            Indonesia.
          </p>

          <h3 className="text-2xl font-bold text-[#FB6B00]">Misi</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Mengedukasi masyarakat tentang pentingnya pengelolaan limbah jelantah.</li>
            <li>Menyediakan solusi pengumpulan, tabungan, dan jual-beli minyak jelantah.</li>
            <li>Mendukung UMKM dan rumah tangga untuk mendapatkan nilai ekonomi dari limbah.</li>
            <li>Mendorong gerakan sosial-lingkungan yang berkelanjutan.</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
