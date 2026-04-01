"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection({ title, description, imageUrl }) {
  const ref = useRef(null);

  // Parallax Setup: Start when element is in view, end when it leaves viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Calculate transforms with larger spans for smoother, more noticeable parallax
  // Background moves down slightly slower than scroll
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Initial scale out for the image to prevent cutting off edges during parallax
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  // Text fades out faster and moves up to create a depth effect
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[50vh] min-h-[450px] lg:h-[60vh] lg:min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-950"
    >
      {/* Edge-to-Edge Background Image with Parallax & Scale */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center origin-bottom"
        style={{
          backgroundImage: `url(${imageUrl})`,
          y: yImage,
          scale: scaleImage,
        }}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.8, scale: 1.1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Smooth custom bezier
      />

      {/* Advanced Gradient Overlays for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-gray-950/80 pointer-events-none" />

      {/* Pattern Overlay (Dots) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      {/* Massive Glowing Core behind text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[800px] h-[800px] rounded-full bg-orange-500/20 blur-[150px] mix-blend-screen"
        />
      </div>

      {/* Modern Presentation Container with Parallax Text */}
      <motion.div
        style={{
          opacity: opacityText,
          y: yText,
        }}
        className="relative z-20 flex flex-col items-center justify-center px-6 lg:px-12 text-center w-full max-w-5xl mx-auto pt-20"
      >
        {/* Futuristic Badge/Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
          <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">
            Eksplorasi Inisiatif
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 w-full"
        >
          {/* Main Title - Ultra Modern Typography */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i % 2 !== 0
                    ? "text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-500"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Epic Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-light tracking-wide mix-blend-plus-lighter"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Subtle Decorative Line Below */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-orange-500/50 to-transparent mt-12"
        />
      </motion.div>
    </div>
  );
}
