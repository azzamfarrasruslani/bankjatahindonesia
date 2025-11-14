"use client";

import { motion } from "framer-motion";
import { Users, Home, Factory, Target, TrendingUp } from "lucide-react";

export default function TargetPasar() {
  const targetData = [
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Industri Makanan",
      volume: "714.296,6",
      unit: "kilo liter/tahun",
      description: "Sebanyak 714.296,6 kilo liter jelantah dihasilkan dari industri pengolahan makanan setiap tahunnya, menjadi potensi besar untuk didaur ulang secara ekonomi dan lingkungan.",
      stats: "70%"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Hotel, Restoran & Kafe",
      volume: "218.871,7",
      unit: "kilo liter/tahun",
      description: "218.871,7 kilo liter berasal dari sektor hospitality seperti hotel, restoran, dan kafe, yang sangat potensial menjadi mitra program pengumpulan minyak jelantah.",
      stats: "25%"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "UMKM & Rumah Tangga",
      volume: "500.000+",
      unit: "rumah tangga",
      description: "Rumah tangga dan UMKM adalah sumber utama minyak jelantah dari aktivitas sehari-hari. Kami mendorong partisipasi aktif mereka dalam program tabungan jelantah dan edukasi lingkungan.",
      stats: "80% Potensi"
    }
  ];

  return (
    <section className=" px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Segmen Pasar
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Target{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
              Pasar Kami
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Menjangkau berbagai sektor yang menjadi sumber utama minyak jelantah 
            dengan solusi berkelanjutan untuk pengelolaan limbah yang bertanggung jawab.
          </p>
        </motion.div>

        {/* Market Segments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {targetData.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    {segment.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {segment.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary font-medium">{segment.stats}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volume Highlight */}
              <div className="relative z-10 mb-4">
                <div className="text-3xl font-bold text-primary">
                  {segment.volume}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {segment.unit}
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-gray-600 leading-relaxed text-sm mb-6">
                {segment.description}
              </p>

              {/* Progress Indicator */}
              <div className="relative z-10">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: segment.stats }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    viewport={{ once: true }}
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-primary-dark"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Potensi</span>
                  <span className="text-primary font-medium">{segment.stats}</span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 max-w-2xl mx-auto">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong className="text-gray-900">Total Potensi:</strong> Lebih dari{' '}
              <strong className="text-primary">1,4 juta kilo liter</strong> minyak jelantah 
              per tahun yang dapat dikelola secara bertanggung jawab melalui program Bank Jatah Indonesia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}