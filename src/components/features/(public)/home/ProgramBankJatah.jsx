"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Tabungan Jelantah",
    desc: "Menabung mulai 1 kg minyak jelantah untuk mendapatkan saldo e-wallet, poin reward, hingga penghasilan besar.",
    image: "/images/program/1.jpeg",
    icon: "/icons/tabungan.png",
    href: "/program/tabungan-jelantah",
  },
  {
    id: 2,
    title: "Jual Beli Jelantah",
    desc: "Jual minyak jelantah dengan harga bersaing dan proses penjemputan mudah di kelurahan Anda.",
    image: "/images/program/2.jpeg",
    icon: "/icons/jualbeli.png",
    href: "/program/jual-beli-jelantah",
  },
  {
    id: 3,
    title: "Sedekah Jelantah",
    desc: "Salurkan minyak jelantah Anda untuk mendukung program sosial & pelestarian lingkungan.",
    image: "/images/program/3.jpeg",
    icon: "/icons/sedekah.png",
    href: "/program/sedekah-jelantah",
  },
];

export default function ProgramBankJatah() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % programs.length);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);

  const current = programs[activeIndex];

  return (
    <section className="w-full bg-white relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Light Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Subtle Accent Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-100 mb-6 shadow-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">
              Program Unggulan
            </span>
          </div>

          {/* Title - Bold & High Contrast */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.15] tracking-tight uppercase">
            Program <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Bank Jatah
            </span>
          </h2>

          {/* Clean Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Solusi inovatif dan berkelanjutan untuk mengelola minyak jelantah
            melalui ekosistem program yang saling menguntungkan.
          </p>
        </motion.div>

        {/* Desktop & Tablet Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{ y: -10 }}
              className="group relative h-[480px] rounded-[2rem] overflow-hidden bg-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all duration-500 cursor-pointer border border-transparent hover:border-orange-200"
            >
              {/* Premium Background Image Handling */}
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />

              {/* Refined Smooth Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Card Content Container */}
              <div className="relative z-20 h-full flex flex-col justify-end p-8 text-white">
                {/* Icon Wrapper with Glassmorphism */}
                <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-3 group-hover:bg-orange-500 group-hover:border-orange-400 transition-colors shadow-lg">
                    <Image
                      src={program.icon}
                      alt="icon"
                      width={32}
                      height={32}
                      className="object-contain filter brightness-0 invert"
                      // Note: Depending on actual icons, they might not need inversion if already white
                    />
                  </div>
                </div>

                {/* Typography hierarchy */}
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-orange-400 transition-colors duration-300">
                  {program.title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed mb-8 font-light line-clamp-3 group-hover:text-gray-200 transition-colors">
                  {program.desc}
                </p>

                {/* Styled View Details Link */}
                <Link href={program.href} className="inline-block mt-auto">
                  <motion.div className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold py-3.5 px-6 rounded-full text-sm uppercase tracking-wider group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View with Smooth Interactive Slider */}
        <div className="md:hidden relative px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              <div className="relative z-20 h-full flex flex-col justify-end p-7 text-white">
                {/* Mobile Icon */}
                <div className="mb-5">
                  <div className="w-14 h-14 rounded-full bg-orange-500/90 backdrop-blur-md border border-orange-400 flex items-center justify-center p-2.5 shadow-lg">
                    <Image
                      src={current.icon}
                      alt="icon"
                      width={28}
                      height={28}
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                  {current.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-8 font-light">
                  {current.desc}
                </p>

                <Link href={current.href}>
                  <div className="inline-flex w-full items-center justify-center gap-2 bg-orange-500 text-white font-bold py-4 rounded-full text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                    <span>Pelajari Program</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Smooth Controls */}
          <div className="flex justify-between items-center mt-8 px-4">
            {/* Minimal Dots */}
            <div className="flex items-center gap-2.5">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "bg-orange-500 w-8"
                      : "bg-gray-200 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Premium Arrow Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white border border-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 transition-all duration-300 flex items-center justify-center shadow-sm active:scale-90"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center active:scale-90"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
