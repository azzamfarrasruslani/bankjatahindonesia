// components/common/HeroSection.jsx
"use client";

import { motion } from "framer-motion";

export default function HeroSection({ title, description, imageUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative top-4 z-10 mx-auto mb-16 h-[500px] md:h-[550px] w-[95%] md:w-[90%] lg:w-[95%] overflow-hidden rounded-3xl shadow-2xl group"
    >
      {/* Background Image dengan Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Gradient Overlay yang Lebih Modern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/50 to-transparent rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent rounded-3xl" />
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-16 right-16 w-24 h-24 rounded-full bg-yellow-400/15 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10 blur-2xl"
        />
      </div>

      {/* Konten Teks */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl space-y-6"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
              {title}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-light"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}