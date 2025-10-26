"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Recycle, HandCoins, HeartHandshake } from "lucide-react";

// Data 'manfaat' tidak berubah
const manfaat = [
  {
    icon: <Recycle size={24} className="text-white" />,
    title: "Kurangi Pencemaran",
    desc: "Minyak jelantah yang dibuang ke selokan dapat mencemari tanah dan air.",
  },
  {
    icon: <Leaf size={24} className="text-white" />,
    title: "Didaur Ulang Jadi Biodiesel",
    desc: "Minyak bekas bisa diolah kembali menjadi biodiesel ramah lingkungan.",
  },
  {
    icon: <HandCoins size={24} className="text-white" />,
    title: "Menambah Penghasilan",
    desc: "Setiap liter minyak jelantah bisa ditukar dengan saldo digital.",
  },
  {
    icon: <HeartHandshake size={24} className="text-white" />,
    title: "Bisa Disedekahkan",
    desc: "Jadikan minyak jelantah sebagai bentuk sedekah ke lembaga sosial.",
  },
];

export default function ManfaatJelantah() {
  return (
    // PERUBAHAN: Menambah padding vertikal ke 'py-24' untuk whitespace lebih
    <section className="bg-[#F9FAFB] py-24 px-4 sm:px-10">
      <div
        // PERUBAHAN: 
        // 1. Mengganti 'items-center' dengan 'items-stretch' agar tinggi kedua kolom sama
        // 2. Menambah 'gap-12' (sebelumnya 10) untuk 'whitespace'
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-12"
      >
        {/* Gambar Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          // PERUBAHAN: Mengubah rasio ke 40% (5/12) di desktop
          className="w-full lg:w-5/12 relative"
        >
          {/* PERUBAHAN: Menambah 'h-full' agar wrapper ini mengisi kolom */}
          <div className="rounded-xl overflow-hidden shadow-lg relative z-10 h-full">
            <Image
              src="/images/manfaat.jpeg"
              alt="Ilustrasi Manfaat Jelantah"
              width={600}
              height={700}
              // PERUBAHAN: Mengganti 'h-[500px]' menjadi 'h-full' agar gambar mengisi wrapper
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kotak angka kecil di atas gambar */}
          {/* PERUBAHAN: 
              1. Mengubah posisi ke 'bottom-8 left-8'
              2. Menerapkan efek glassmorphism (bg-opacity, backdrop-blur)
              3. Menambah border halus untuk definisi
          */}
          <div
            className="absolute bottom-8 left-8 bg-[#FB6B00]/80 backdrop-blur-sm 
                       text-white rounded-lg px-5 py-3 shadow-md z-20
                       border border-white/30"
          >
            <p className="text-2xl font-bold">10K+</p>
            <p className="text-sm">Liter Terkumpul</p>
          </div>
        </motion.div>

        {/* Konten Kanan */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          // PERUBAHAN: Mengubah rasio ke 60% (7/12) di desktop
          className="w-full lg:w-7/12"
        >
          {/* Bagian tipografi (eyebrow & title) sudah sangat baik, tidak diubah */}
          <p className="text-sm font-medium text-[#FB6B00] uppercase mb-2">
            Kenapa Jelantah Penting?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
            Solusi Inovatif untuk
            <br />
            Lingkungan dan Ekonomi
          </h2>

          {/* PERUBAHAN: Mengganti 'space-y-6' menjadi layout grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {manfaat.map((item, index) => (
              <div
                key={index}
                // PERUBAHAN: 
                // 1. Menambah padding ke 'p-5'
                // 2. Memperhalus interaksi: 'hover:shadow-lg' dan 'hover:-translate-y-1'
                className="flex items-start gap-4 p-5 bg-white rounded-lg shadow-sm 
                           hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {/* PERUBAHAN: 
                    1. Menambah padding ke 'p-3' dan 'rounded-lg'
                    2. Menambah 'flex-shrink-0' agar ikon tidak 'gepeng'
                */}
                <div className="bg-[#FB6B00] p-3 rounded-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}