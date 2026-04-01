"use client";

import Image from "next/image";
import {
  Flame,
  Target,
  Lightbulb,
  Users,
  Star,
  Award,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SejarahVisiMisi() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 bg-white overflow-hidden py-10 lg:py-16">
      <div className="max-w-7xl mx-auto relative">
        {/* Subtle Background Ornaments */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-orange-100/40 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-50/50 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24 relative z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-orange-200 bg-orange-50 rounded-full mb-6 mx-auto shadow-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              Tentang Kami
            </span>
          </div>

          {/* Title - Light Theme High Contrast */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            Sejarah, Visi & <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Misi Kami
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Mengenal lebih dekat perjalanan Bank Jatah Indonesia serta tekad
            kami untuk terus menghadirkan siklus hidup hijau yang bermanfaat
            bagi nusa dan bangsa.
          </p>
        </motion.div>

        {/* Main Content Grid (Text Left, Img Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28 relative z-10">
          {/* Left Panel: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-[1.1] uppercase tracking-tight">
                Mengelola Limbah,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  Membangun Masa Depan
                </span>
              </h3>

              <div className="space-y-5 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  Lahir sebagai respons positif dari{" "}
                  <strong className="text-gray-900 font-bold">
                    dampak Pandemi Covid-19
                  </strong>{" "}
                  di pertengahan tahun 2021, kami terinspirasi untuk
                  memberdayakan ekonomi sirkular. Membawa misi edukasi masif
                  tentang betapa berharganya minyak jelantah jika ditata ulang.
                </p>

                <div className="flex items-start gap-4 p-5 sm:p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />

                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-orange-100">
                    <Calendar className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="pt-1">
                    Pada{" "}
                    <strong className="text-orange-600 font-bold">
                      28 Agustus 2021
                    </strong>
                    , Bank Jatah secara resmi didirikan sebagai pionir konversi
                    dan pelestarian, menghubungkan lingkungan, gaya hidup sehat,
                    dan kebebasan finansial.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats Blocks */}
            <div className="grid grid-cols-2 gap-4 max-w-sm pt-4">
              <div className="bg-white rounded-[2rem] p-6 text-center border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-1">
                  2+
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Tahun Berdiri
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 text-center border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-1">
                  50+
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Mitra Aktif
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Showcase Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-[0_10px_40px_rgba(249,115,22,0.08)] bg-gray-50 border border-gray-100">
              <Image
                src="/images/parallax.jpeg"
                alt="Sejarah Bank Jatah Indonesia"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />

              {/* Year Badge Floating */}
              <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 min-w-[140px] text-center">
                <div className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                  2021
                </div>
                <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Bersejarah
                </div>
              </div>
            </div>
            {/* Outline box accent */}
            <div className="absolute -z-10 -bottom-6 lg:-bottom-8 -left-6 lg:left-auto lg:-right-6 w-full max-w-md lg:max-w-none h-full border-[3px] border-orange-100 rounded-[2.5rem]" />
          </motion.div>
        </div>

        {/* Features Sub-Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-28 relative z-10"
        >
          {[
            {
              icon: (
                <Flame className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
              ),
              title: "Konsultan Berpengalaman",
              description:
                "Pendampingan khusus dan ahli dari tim profesional untuk operasional harian berkelanjutan.",
            },
            {
              icon: (
                <Target className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
              ),
              title: "Analisis Bisnis Cerdas",
              description:
                "Pemetaan kebutuhan komersial UMKM menuju transformasi peduli lingkungan hemat biaya.",
            },
            {
              icon: (
                <Lightbulb className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
              ),
              title: "Layanan Terintegrasi",
              description:
                "Dari pelatihan hingga infrastruktur sirkular siap dukung seluruh lapisan kelompok sosial.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group flex flex-col p-8 bg-white border border-gray-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] hover:border-orange-200 transition-all duration-500 cursor-pointer"
            >
              {/* Subtle Glow bg on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base mb-2">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-orange-50 rounded-[2.5rem] p-10 lg:p-14 border border-orange-100 shadow-inner overflow-hidden"
        >
          {/* Internal Ornaments */}
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-white rounded-full blur-[40px] opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-orange-200/40 rounded-full blur-[60px] opacity-60 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: <Users className="w-7 h-7" />,
                value: "25K+",
                label: "Klien Bahagia",
              },
              {
                icon: <Star className="w-7 h-7" />,
                value: "4.5+",
                label: "Rating Terbaik",
              },
              {
                icon: <Target className="w-7 h-7" />,
                value: "330+",
                label: "Capaian Proyek",
              },
              {
                icon: <Award className="w-7 h-7" />,
                value: "16+",
                label: "Penghargaan",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center group flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-500 mb-4 shadow-sm border border-gray-100 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_8px_25px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
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
