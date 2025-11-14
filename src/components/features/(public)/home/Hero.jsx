"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const heroImages = [
  "/images/hero.webp",
  "/images/hero2.jpeg",
  "/images/hero3.jpeg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 md:px-6 lg:px-8 pt-6">
      <section className="relative h-[85vh] sm:h-[90vh] w-full overflow-hidden rounded-3xl bg-gray-900">
        {/* Background Slider dengan Overlay Modern */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${heroImages[currentIndex]}')` }}
              />
              {/* Gradient Overlay dengan Primary Color */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-primary/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-primary/10 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Konten Hero yang Minimalis */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-12 lg:px-16 text-white">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge/Tag dengan Primary Color */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-light">Eco-Friendly Solution</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-6 ">
              Ubah Minyak Jelantah
              <br />
              Menjadi{" "}
              <span className="font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-primary">
                Aset Berharga
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Bank Sampah Indonesia menghadirkan solusi berkelanjutan untuk mengelola minyak jelantah 
              dengan manfaat ekonomi langsung bagi masyarakat.
            </p>

            {/* CTA Buttons dengan Primary Color */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#mitra"
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25"
              >
                <span className="text-base">Jadi Mitra Kami</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#program"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-white hover:bg-primary/10 font-semibold py-3 px-8 rounded-xl border border-primary/50 transition-all duration-300 backdrop-blur-sm hover:border-primary/80"
              >
                <span className="text-base">Eksplor Program</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Navigation Dots dengan Primary Color */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group flex flex-col items-center"
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-white/40 group-hover:bg-primary/60"
                }`}
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}