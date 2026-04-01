"use client";

import { motion } from "framer-motion";
import { Users, Home, Factory, Target, TrendingUp } from "lucide-react";

export default function TargetPasar() {
  const targetData = [
    {
      icon: <Factory className="w-7 h-7" />,
      title: "Industri Makanan",
      volume: "714.296,6",
      unit: "kilo liter/tahun",
      description:
        "Sebanyak 714.296,6 kilo liter jelantah dihasilkan dari industri pengolahan makanan setiap tahunnya, menjadi potensi besar untuk didaur ulang secara ekonomi dan lingkungan.",
      stats: "70%",
    },
    {
      icon: <Home className="w-7 h-7" />,
      title: "Hotel, Restoran & Kafe",
      volume: "218.871,7",
      unit: "kilo liter/tahun",
      description:
        "218.871,7 kilo liter berasal dari sektor hospitality seperti hotel, restoran, dan kafe, yang sangat potensial menjadi mitra program pengumpulan minyak jelantah.",
      stats: "25%",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "UMKM & Rumah Tangga",
      volume: "500.000+",
      unit: "rumah tangga",
      description:
        "Rumah tangga dan UMKM adalah sumber utama minyak jelantah dari aktivitas sehari-hari. Kami mendorong partisipasi aktif mereka dalam program tabungan jelantah dan edukasi lingkungan.",
      stats: "80%",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-orange-200 bg-orange-50 rounded-full mb-6 mx-auto shadow-sm">
            <Target className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              Segmen Pasar
            </span>
          </div>

          {/* Title - Light Theme High Contrast */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            Target <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Pasar Kami
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Solusi berkelanjutan kami didesain merata untuk berbagai sektor
            penghasil limbah, dari skala rumah tangga hingga industri raksasa.
          </p>
        </motion.div>

        {/* Market Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {targetData.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white flex flex-col rounded-[2.5rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] border border-gray-100 hover:border-orange-200 transition-all duration-500 cursor-pointer overflow-hidden h-full"
            >
              {/* Internal Subtle Glow Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Header Icon & Title */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-[1.25rem] border border-orange-100 flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {segment.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight mb-1 line-clamp-2">
                      {segment.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md border border-gray-100">
                      <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                        {segment.stats} Potensi
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volume Data Panel */}
              <div className="relative z-10 mb-6 bg-gray-50/50 p-5 rounded-3xl border border-gray-100 group-hover:border-orange-100 group-hover:bg-white transition-colors">
                <div className="text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 mb-1 transition-colors">
                  {segment.volume}
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {segment.unit}
                </div>
              </div>

              {/* Body Text */}
              <p className="relative z-10 text-gray-600 leading-relaxed font-light text-sm sm:text-base mb-8 flex-grow">
                {segment.description}
              </p>

              {/* Progress Indicator Component */}
              <div className="relative z-10 mt-auto pt-6 border-t border-gray-100 group-hover:border-orange-100">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  <span>Capaian Pasar</span>
                  <span className="text-orange-600">{segment.stats}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 p-0.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: segment.stats }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + index * 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-inner"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-full px-8 py-4 shadow-sm group hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-gray-900 font-bold uppercase tracking-wider mr-2">
                Total Potensi:
              </strong>
              Lebih dari{" "}
              <strong className="text-orange-600 font-bold">
                1,4 juta kilo liter
              </strong>{" "}
              minyak jelantah per tahun dapat dikelola bersama Bank Jatah.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
