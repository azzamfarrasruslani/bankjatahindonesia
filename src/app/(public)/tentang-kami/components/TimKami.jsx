"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function TimKami() {
  const teamMembers = [
    {
      name: "Zainal Abidin",
      role: "Direktur Kemitraan & Pemasaran",
      img: "/images/team/zai.jpeg",
    },
    {
      name: "MHD. Adriyo Habibi",
      role: "Direktur Utama",
      img: "/images/team/habibi.jpeg",
    },
    {
      name: "Sukiswanto",
      role: "Direktur Operasional",
      img: "/images/team/sukis.jpeg",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 px-6 md:px-1"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <p className="text-[#FB6B00] uppercase text-sm font-semibold tracking-wider">
          Tim Kami
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Temui Tim di Balik Bank Jatah Indonesia
        </h2>
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          Tim kami berdedikasi untuk mengubah limbah menjadi manfaat ekonomi,
          sosial, dan lingkungan yang berkelanjutan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative bg-white rounded-2xl shadow hover:shadow-2xl overflow-hidden transition"
          >
            {/* Foto + gradient overlay */}
            <div className="relative w-full h-80">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#FB6B00]/50 to-transparent"></div>

              {/* Icon arah */}
              <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full hover:bg-[#FB6B00] transition">
                <ArrowUpRight
                  size={16}
                  className="text-[#FB6B00] hover:text-white"
                />
              </div>
            </div>

            {/* Nama dan Role */}
            <div className="p-4 text-center">
              <h4 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h4>
              <p className="text-sm text-gray-700">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
