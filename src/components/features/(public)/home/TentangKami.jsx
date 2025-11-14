"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TentangKami() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Kiri: Gambar dengan Height yang Seimbang */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative aspect-[5/6] lg:aspect-[4/5] rounded-2xl overflow-hidden group">
              {/* Main Image */}
              <Image
                src="/images/tentang-kami.png"
                alt="Bank Jatah Indonesia - Mengubah Minyak Jelantah Menjadi Nilai Ekonomi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-900">
                    Sejak 2022
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl -z-10" />
            <div className="absolute -top-3 -left-3 w-14 h-14 bg-primary/10 rounded-full blur-lg -z-10" />
          </motion.div>

          {/* Kanan: Konten Teks dengan Height yang Match */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-7/12 flex flex-col justify-center min-h-[500px] lg:min-h-[550px]"
          >
            <div className="space-y-6 lg:space-y-7">
              {/* Header Section */}
              <div className="space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Tentang Kami
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Dari Limbah Jadi{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
                    Berkah Nyata
                  </span>
                </h2>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">
                    Bank Jatah Indonesia
                  </strong>{" "}
                  adalah inisiatif berkelanjutan yang mentransformasi minyak
                  jelantah menjadi solusi bernilai tinggi — mengintegrasikan
                  aspek ekonomi, sosial, dan lingkungan dalam satu ekosistem
                  yang saling menguntungkan.
                </p>

                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Nilai Ekonomi
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Konversi limbah menjadi tabungan dan penghasilan
                        tambahan untuk masyarakat
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Dampak Sosial
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Memberdayakan masyarakat melalui program berkelanjutan
                        dan inklusif
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Solusi Lingkungan
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Mengurangi polusi air dan mendukung penerapan ekonomi
                        sirkular
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Link
                  href="/tentang-kami"
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 group"
                >
                  <span>Pelajari Visi Kami</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
