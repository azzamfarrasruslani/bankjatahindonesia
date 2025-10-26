"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const lokasiData = [
  {
    nama: "Mitra Jelantah Jakarta",
    alamat: "Jl. Melati No. 10, Jakarta Selatan",
    koordinat: "https://maps.google.com/?q=-6.2607,106.7816",
  },
  {
    nama: "Agen Bekasi Timur",
    alamat: "Jl. Karya Baru No. 15, Bekasi",
    koordinat: "https://maps.google.com/?q=-6.2488,107.0046",
  },
  {
    nama: "Mitra UMKM Bandung",
    alamat: "Jl. Riau No. 123, Bandung",
    koordinat: "https://maps.google.com/?q=-6.8971,107.6216",
  },
];

export default function LokasiPage() {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <div className="max-w-7xl mx-auto"> 
        
        {/* Konten Judul dan Deskripsi Dibuat Rata Tengah */}
        <div className="text-center mt-10"> 
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900">
            <span className="bg-gradient-to-r from-[#FB6B00] to-orange-600 bg-clip-text text-transparent">
              Jaringan Lokasi Kami
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600 mb-16 text-lg">
            Temukan mitra dan agen pengumpulan terdekat kami di berbagai kota.
            Kami siap melayani kebutuhan pengelolaan limbah Anda.
          </p>
        </div>

        {/* Daftar Kartu Lokasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {lokasiData.map((lokasi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              // Tambahkan 'text-left' untuk memastikan konten kartu tidak rata tengah
              className="relative bg-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl border-t-4 border-t-transparent hover:border-t-[#FB6B00] transition-all duration-300 text-left"
            >

              {/* Header */}
              <div className="flex items-start mb-5">
                <MapPin className="w-7 h-7 text-[#FB6B00] mr-3 flex-shrink-0" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                  {lokasi.nama}
                </h2>
              </div>

              {/* Alamat */}
              {/* Hapus 'pl-10' dan ganti dengan 'ml-10' untuk offset yang benar, atau pertahankan struktur yang ada dan perbaiki elemen di dalamnya */}
              <div className="mb-6 ml-10 border-l border-gray-200 pl-4"> 
                <p className="text-gray-600 mb-1 font-medium">Alamat:</p>
                <p className="text-gray-700 leading-relaxed">{lokasi.alamat}</p>
              </div>

              {/* Info tambahan */}
              <div className="ml-10 mb-8 text-sm text-gray-500 space-y-1 leading-relaxed pl-4">
                <p>Jam operasional: Senin - Jumat, 08.00 - 17.00</p>
                <p>Kontak: +62 812 3456 7890</p>
              </div>

              {/* Tombol Peta */}
              <div className="ml-10 pl-4">
                <motion.a
                  href={lokasi.koordinat}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ backgroundColor: "#e97600" }}
                  // Tombol dibuat rata kiri secara default karena div container sudah rata kiri
                  className="w-full md:w-auto inline-flex items-center justify-center bg-[#FB6B00] text-white font-semibold py-3 px-6 rounded-xl shadow transition-colors duration-200"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Lihat di Peta
                </motion.a>
              </div>

              {/* Decorative shapes */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#FB6B00]/20 blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-orange-400/20 blur-3xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}