"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Recycle, HandCoins, HeartHandshake } from "lucide-react";

const manfaat = [
  {
    icon: (
      <Recycle
        size={28}
        className="text-orange-500 group-hover:text-white transition-colors"
      />
    ),
    title: "Kurangi Pencemaran",
    desc: "Cegah pencemaran tanah dan air dari limbah rumah tangga.",
  },
  {
    icon: (
      <Leaf
        size={28}
        className="text-orange-500 group-hover:text-white transition-colors"
      />
    ),
    title: "Jadi Biodiesel",
    desc: "Diolah kembali menjadi energi biodiesel ramah lingkungan.",
  },
  {
    icon: (
      <HandCoins
        size={28}
        className="text-orange-500 group-hover:text-white transition-colors"
      />
    ),
    title: "Penghasilan Tambahan",
    desc: "Tukar dengan saldo digital, sembako, atau reward tunai.",
  },
  {
    icon: (
      <HeartHandshake
        size={28}
        className="text-orange-500 group-hover:text-white transition-colors"
      />
    ),
    title: "Membangun Kepedulian",
    desc: "Salurkan minyak untuk program sosial dan pemberdayaan.",
  },
];

export default function ManfaatJelantah() {
  return (
    <section className="bg-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/50 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-40 h-40 bg-orange-50 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Enhanced Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-[0_10px_40px_rgba(249,115,22,0.1)] bg-gray-50 border border-gray-100">
              <Image
                src="/images/manfaat.jpeg"
                alt="Ilustrasi Manfaat Jelantah"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />

              {/* Impact Badge */}
              <div className="absolute bottom-6 inset-x-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping absolute opacity-75" />
                    <div className="w-3 h-3 bg-orange-500 rounded-full relative" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                      Fakta Dampak
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                      1L Jelantah menyelamatkan{" "}
                      <span className="text-orange-500">1.000L air</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient accent behind image */}
            <div className="absolute -z-10 -bottom-5 -right-5 w-full h-full border-2 border-orange-100 rounded-[2.5rem]" />
          </motion.div>

          {/* Right: Modern Content Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 flex items-center"
          >
            <div className="w-full space-y-8">
              {/* Header Section */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-orange-200 bg-orange-50 rounded-full w-fit">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
                    Manfaat Jelantah
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-[1.1] uppercase tracking-tight">
                  Dari Limbah <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    Jadi Berkah
                  </span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  Minyak sisa penggorengan tidak seharusnya dibuang.
                  Transformasi minyak jelantah Anda menjadi nilai ekonomi
                  berlipat sekaligus menjaga pelestarian lingkungan sekitarnya.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                {manfaat.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="group flex flex-col p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer"
                  >
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
