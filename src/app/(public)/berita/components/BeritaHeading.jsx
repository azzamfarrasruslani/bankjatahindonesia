"use client";

import { motion } from "framer-motion";

export default function BeritaHeading() {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900 pt-32 pb-40 mb-20 lg:mb-24 flex items-center justify-center group/header">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

      {/* Central Glowing Orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-600/30 blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-orange-400 text-sm font-bold tracking-widest uppercase">
            Portal Informasi
          </span>
        </motion.div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] uppercase drop-shadow-xl mb-6">
          Kabar <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            Teraktual
          </span>
        </h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="w-24 h-1.5 mx-auto origin-center bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
        >
          Ikuti informasi, inovasi terobosan, dan pergerakan sosial terbaru dari
          ekosistem
          <span className="font-medium text-white"> Bank Jatah Indonesia</span>.
        </motion.p>
      </motion.div>
    </div>
  );
}
