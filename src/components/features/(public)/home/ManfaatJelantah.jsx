"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Recycle, HandCoins, HeartHandshake } from "lucide-react";

const manfaat = [
  {
    icon: <Recycle size={24} className="text-white" />,
    title: "Kurangi Pencemaran",
    desc: "Cegah pencemaran tanah dan air dari minyak jelantah.",
  },
  {
    icon: <Leaf size={24} className="text-white" />,
    title: "Jadi Biodiesel",
    desc: "Diolah menjadi biodiesel ramah lingkungan.",
  },
  {
    icon: <HandCoins size={24} className="text-white" />,
    title: "Penghasilan Tambahan",
    desc: "Tukar dengan saldo digital dan reward.",
  },
  {
    icon: <HeartHandshake size={24} className="text-white" />,
    title: "Bersedekah",
    desc: "Salurkan untuk program sosial.",
  },
];

export default function ManfaatJelantah() {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Gambar Kiri */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 relative flex"
          >
            <div className="relative rounded-2xl overflow-hidden group flex-1 min-h-[400px] lg:min-h-[450px]">
              <Image
                src="/images/manfaat.jpeg"
                alt="Ilustrasi Manfaat Jelantah"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
              
            </div>
          </motion.div>

          {/* Konten Kanan - Lebih Ringkas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 flex items-center"
          >
            <div className="w-full space-y-6">
              {/* Header Section - Lebih Ringkas */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="text-primary font-semibold text-xs uppercase tracking-wide">
                    Manfaat Jelantah
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Dari Limbah
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
                    Jadi Berkah
                  </span>
                </h2>

                <p className="text-base text-gray-600 leading-relaxed">
                  Transformasi minyak jelantah menjadi nilai ekonomi dan lingkungan.
                </p>
              </div>

              {/* Benefits Grid - Lebih Kompak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {manfaat.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="group relative p-4 bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer min-h-[100px] flex items-start gap-3"
                  >
                    {/* Icon */}
                    <div className={`p-2 rounded-lg bg-primary shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info - Lebih Ringkas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-primary/5 rounded-xl p-4 border border-primary/10"
              >
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse flex-shrink-0 mt-1" />
                  <p className="text-xs text-gray-700">
                    <strong className="text-gray-900">Dampak:</strong> 1 liter jelantah = 1.000 liter air bersih terselamatkan.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}