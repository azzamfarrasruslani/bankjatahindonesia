"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function LokasiHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 lg:mb-20"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
      >
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
          Jaringan Lokasi
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight"
      >
        Jaringan{" "}
        <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
          Lokasi Kami
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
      >
        Temukan lokasi utama dan mitra kami di berbagai titik strategis Kota Pekanbaru. 
        Kami hadir untuk melayani pengelolaan minyak jelantah secara efisien, profesional, 
        dan ramah lingkungan.
      </motion.p>

      
    </motion.div>
  );
}