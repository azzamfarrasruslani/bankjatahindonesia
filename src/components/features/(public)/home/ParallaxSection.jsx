"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] w-full overflow-hidden"
    >
      {/* Background Image dengan Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/parallax.jpeg')",
          y: y,
          scale: 1.1
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-primary/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-primary rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary rounded-full opacity-50 animate-pulse" />

      {/* Konten Teks */}
      <motion.div 
        className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="max-w-4xl space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Misi Lingkungan</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Ubah Jelantah
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-primary">
              Jadi Berkah
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Mengelola limbah dengan inovasi, membangun masa depan yang berkelanjutan 
            untuk generasi mendatang
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}