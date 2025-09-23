"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Recycle, HandCoins, HeartHandshake } from "lucide-react";

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
    <section className="bg-[#F9FAFB] py-20 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Gambar Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 relative"
        >
        <div className="rounded-xl overflow-hidden shadow-lg relative z-10">
  <Image
    src="/images/manfaat.jpeg"
    alt="Ilustrasi Manfaat Jelantah"
    width={600}
    height={700}
    className="w-full h-[500px] object-cover"
  />
</div>


          {/* Kotak angka kecil di atas gambar */}
          <div className="absolute top-4 left-4 bg-[#FB6B00] text-white rounded-lg px-5 py-3 shadow-md z-20">
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
          className="w-full lg:w-1/2"
        >
          <p className="text-sm font-medium text-[#FB6B00] uppercase mb-2">
            Kenapa Jelantah Penting?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Solusi Inovatif untuk
            <br />
            Lingkungan dan Ekonomi
          </h2>

          <div className="space-y-6">
            {manfaat.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="bg-[#FB6B00] p-2 rounded-md">{item.icon}</div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
