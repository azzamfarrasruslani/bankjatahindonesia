"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Users, Earth } from "lucide-react";

export default function TentangKami() {
  const cards = [
    {
      title: "Nilai Ekonomi",
      description:
        "Konversi limbah menjadi tabungan dan penghasilan tambahan untuk masyarakat secara langsung.",
      icon: TrendingUp,
    },
    {
      title: "Dampak Sosial",
      description:
        "Memberdayakan masyarakat melalui program berkelanjutan yang inklusif dan transparan.",
      icon: Users,
    },
    {
      title: "Solusi Lingkungan",
      description:
        "Mengurangi polusi air dan tanah, serta mendukung penuh penerapan ekonomi sirkular.",
      icon: Earth,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Soft Background Ornaments for Light Theme */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-orange-100/30 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-5/12 relative"
          >
            {/* Clean Rounded Rectangle Design */}
            <div className="relative aspect-[4/5] overflow-hidden group rounded-[2.5rem] bg-gray-100 shadow-2xl">
              {/* Main Image */}
              <Image
                src="/images/tentang-kami.png"
                alt="Bank Jatah Indonesia - Mengubah Minyak Jelantah Menjadi Nilai Ekonomi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />

              {/* Softer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Year Badge */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center justify-center gap-3 shadow-lg">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-gray-900 tracking-wider uppercase">
                  Sejak 2022
                </span>
              </div>
            </div>

            {/* Clean Accent Elements */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-full blur-2xl" />
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-orange-50 rounded-full blur-2xl" />
          </motion.div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            {/* Header Area */}
            <motion.div
              className="space-y-5 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-orange-200 bg-orange-50 rounded-full w-fit">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
                  Tentang Kami
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-[1.1] uppercase tracking-tight">
                Dari Limbah Jadi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                  Berkah Nyata
                </span>
              </h2>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-2xl">
                <strong className="text-gray-900 font-bold">
                  Bank Jatah Indonesia
                </strong>{" "}
                adalah inisiatif berkelanjutan yang mentransformasi minyak
                jelantah menjadi solusi bernilai tinggi — mengintegrasikan aspek
                ekonomi, sosial, dan lingkungan dalam satu ekosistem progresif.
              </p>
            </motion.div>

            {/* Features/Values Cards */}
            <div className="grid gap-4 mb-10">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-5 p-5 sm:p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 rounded-3xl"
                >
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <card.icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-wide uppercase group-hover:text-orange-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href="/tentang-kami"
                className="group relative inline-flex items-center justify-center gap-3 bg-orange-500 text-black font-bold py-4 px-10 rounded-full overflow-hidden transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-1"
              >
                <span className="relative z-10 text-lg uppercase tracking-wider">
                  Pelajari Visi Kami
                </span>
                <svg
                  className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
