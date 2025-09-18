"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative mb-16 h-[350px] md:h-[400px] w-full overflow-hidden rounded-b-4xl bg-gray-200 shadow-lg">
      {/* Background Image */}
      <img
        src="/images/program.jpeg"
        alt="Program Bank Jatah Indonesia"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-60 scale-105 transition-transform duration-700 hover:scale-110"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Floating Pulse Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-10 left-10 w-16 h-16 rounded-full bg-orange-500/40 blur-3xl animate-pulse"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-yellow-400/30 blur-3xl animate-pulse"
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold drop-shadow-xl"
        >
          Program <span className="text-[#FB6B00]">Bank Jatah Indonesia</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-white text-lg md:text-xl max-w-2xl drop-shadow-md"
        >
          Jelajahi berbagai program inovatif kami dalam pengelolaan minyak
          jelantah – dari tabungan, jual beli, hingga sedekah untuk masyarakat
          yang lebih berkelanjutan.
        </motion.p>
      </div>
    </div>
  );
}
