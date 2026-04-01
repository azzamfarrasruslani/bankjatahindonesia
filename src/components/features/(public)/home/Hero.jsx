"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PlayCircle, Recycle } from "lucide-react";

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
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImages[currentIndex]}')` }}
            />
            {/* Dark overlay specifically tailored for orange/black theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white container mx-auto">
        <motion.div
          className="max-w-3xl flex flex-col space-y-6 lg:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black leading-[1.05] tracking-tight text-white uppercase break-words">
            Masa Depan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 block mt-2 sm:mt-0">
              Minyak Jelantah
            </span>
          </h1>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-md w-fit"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <Recycle className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-orange-400 tracking-wider uppercase">
              Pionir Ekonomi Sirkular
            </span>
          </motion.div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
            Jangan biarkan limbah minyak Anda merusak lingkungan. Bersama kami,
            ubah minyak jelantah menjadi energi terbarukan dan dapatkan
            keuntungan ekonomi langsung.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#mitra"
              className="group relative inline-flex items-center justify-center gap-3 bg-orange-500 text-black font-bold py-4 px-8 rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] border border-orange-400"
            >
              <span className="relative z-10 text-lg uppercase tracking-wider">
                Mulai Sekarang
              </span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#program"
              className="inline-flex items-center justify-center gap-3 bg-black/50 hover:bg-black/80 text-white font-semibold py-4 px-8 rounded-full border border-orange-500/30 hover:border-orange-500 backdrop-blur-md transition-all uppercase tracking-wider"
            >
              <PlayCircle className="w-5 h-5 text-orange-500" />
              <span className="text-lg">Pelajari Prosesnya</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group flex flex-col items-center p-2"
            aria-label={`Beralih ke slide ${index + 1}`}
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? "w-12 bg-orange-500"
                  : "w-4 bg-white/30 group-hover:bg-orange-500/50"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
