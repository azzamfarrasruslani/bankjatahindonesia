"use client";

import Image from "next/image";
import { Flame, Target, Lightbulb, Users, Star, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function SejarahVisiMisi() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Tentang Kami
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Sejarah, Visi &{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
              Misi Kami
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mengenal lebih dalam tentang perjalanan Bank Jatah Indonesia dan komitmen kami 
            dalam menciptakan solusi berkelanjutan untuk lingkungan dan masyarakat.
          </p>
        </motion.div>

        {/* About Grid: Teks kiri, Gambar kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Mengelola Limbah,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
                  Membangun Masa Depan
                </span>
              </h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Bank Jatah berawal dari dampak <strong className="text-gray-900">Pandemi Covid-19</strong> pada tahun 2021, 
                  yang memberikan inspirasi untuk menciptakan peluang usaha sekaligus mengedukasi masyarakat 
                  mengenai pentingnya pengelolaan limbah jelantah yang bertanggung jawab.
                </p>
                
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p>
                    Tepat pada <strong className="text-primary">28 Agustus 2021</strong>, Bank Jatah resmi diluncurkan 
                    sebagai gerakan sosial-lingkungan yang mengubah limbah jelantah menjadi nilai ekonomi dan sosial 
                    yang berkelanjutan.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-primary mb-1">2+</div>
                <div className="text-sm text-gray-600">Tahun Berdiri</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-gray-600">Mitra Aktif</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="/images/parallax.jpeg"
                alt="Sejarah Bank Jatah Indonesia"
                width={600}
                height={500}
                className="w-full h-[400px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
              
              {/* Floating Element */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">2021</div>
                  <div className="text-xs text-gray-600">Tahun Berdiri</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features / Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20"
        >
          {[
            {
              icon: <Flame className="w-8 h-8" />,
              title: "Konsultan Berpengalaman",
              description: "Tim ahli kami siap membantu pengelolaan limbah dengan solusi terbaik dan berkelanjutan."
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Analisis Bisnis Terbaik",
              description: "Menganalisis kebutuhan masyarakat dan UMKM untuk solusi ramah lingkungan yang bernilai ekonomi."
            },
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: "Layanan Terjangkau",
              description: "Solusi pengumpulan, tabungan, dan jual-beli minyak jelantah yang mudah diakses semua kalangan."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Users className="w-6 h-6" />, value: "25K+", label: "Klien Bahagia" },
              { icon: <Star className="w-6 h-6" />, value: "4.5+", label: "Rating Rata-rata" },
              { icon: <Target className="w-6 h-6" />, value: "330+", label: "Proyek Selesai" },
              { icon: <Award className="w-6 h-6" />, value: "16+", label: "Penghargaan" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}