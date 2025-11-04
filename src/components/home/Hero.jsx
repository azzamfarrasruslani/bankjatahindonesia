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
    <div className="px-4 md:px-4 lg:px-6 pt-6">
      <section className="relative h-screen w-full overflow-hidden rounded-2xl shadow-lg">
        {/* Background Slider with Fade Animation */}
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
          {/* Fallback Background Gelap */}
          <div className="absolute inset-0 bg-black/70" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 bg-cover bg-center"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url('${heroImages[currentIndex]}')`,
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Konten Hero */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-white text-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Ubah Minyak Jelantah Jadi <br />
              Tabungan{" "}
              <span className="bg-gradient-to-r from-[#FB6B00] to-white bg-clip-text text-transparent drop-shadow-md">
                Masa Depan
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 drop-shadow-sm">
              Bersama <strong>Bank Jatah Indonesia</strong>, lindungi lingkungan
              sambil dapat manfaat ekonomi langsung. Kami hadir di seluruh
              Indonesia, siap menjemput minyak jelantah Anda!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#mitra"
                className="bg-[#FB6B00] hover:bg-[#e35e00] text-white font-semibold py-3 px-6 rounded-full transition duration-200 shadow-md"
              >
                Jadi Mitra Kami!
              </a>
              <a
                href="#program"
                className="bg-white text-gray-900 hover:text-[#FB6B00] hover:border-[#FB6B00] font-semibold py-3 px-6 rounded-full border border-white transition duration-200"
              >
                Lihat Program Kami
              </a>
            </div>
          </div>

          {/* Indikator Dot */}
          {/* Indikator Dot Fancy di Bawah */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-6 h-3 bg-[#FB6B00]"
                    : "w-3 h-3 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
