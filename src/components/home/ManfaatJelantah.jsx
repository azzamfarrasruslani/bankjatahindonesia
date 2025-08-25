"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, HandCoins, HeartHandshake } from "lucide-react";

const manfaat = [
  {
    icon: <Recycle size={40} className="text-[#FB6B00]" />,
    title: "Kurangi Pencemaran",
    desc: "Minyak jelantah yang dibuang ke selokan dapat mencemari tanah dan air. Dengan pengelolaan yang tepat, kita mencegah kerusakan lingkungan.",
  },
  {
    icon: <Leaf size={40} className="text-[#FB6B00]" />,
    title: "Didaur Ulang Jadi Biodiesel",
    desc: "Minyak bekas bisa diolah kembali menjadi biodiesel — sumber energi alternatif yang ramah lingkungan.",
  },
  {
    icon: <HandCoins size={40} className="text-[#FB6B00]" />,
    title: "Menambah Penghasilan",
    desc: "Setiap liter minyak jelantah yang dikumpulkan bisa ditukar dengan saldo digital atau uang tunai.",
  },
  {
    icon: <HeartHandshake size={40} className="text-[#FB6B00]" />,
    title: "Bisa Disedekahkan",
    desc: "Minyak jelantah bisa menjadi bentuk sedekah yang bernilai untuk lembaga sosial dan rumah ibadah.",
  },
];

export default function ManfaatJelantah() {
  return (
    <section className="bg-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-[#FB6B00] mb-4"
        >
          Manfaat Jelantah
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Minyak jelantah bukan lagi limbah — kini menjadi solusi untuk lingkungan dan ekonomi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {manfaat.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
