"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % programs.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);

  const current = programs[activeIndex];

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50/50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Program Unggulan
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Program{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
              Bank Jatah
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Solusi inovatif dan berkelanjutan untuk mengelola minyak jelantah 
            melalui berbagai program yang menguntungkan
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
              
              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white">
                {/* Icon */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <Image
                      src={program.icon}
                      alt="icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-gray-200 text-sm leading-relaxed mb-6">
                  {program.desc}
                </p>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm group/btn"
                >
                  <span>Selengkapnya</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Tablet Grid View (2 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[380px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
              <div className="relative z-20 h-full flex flex-col justify-end p-5 text-white">
                <div className="mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <Image
                      src={program.icon}
                      alt="icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-200 text-xs leading-relaxed mb-4">
                  {program.desc}
                </p>
                <div className="inline-flex items-center gap-1 text-white font-semibold text-xs">
                  <span>Selengkapnya</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent" />
              
              <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <Image
                      src={current.icon}
                      alt="icon"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {current.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-6">
                  {current.desc}
                </p>

                {/* CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm"
                >
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6 px-2">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-primary w-6" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}