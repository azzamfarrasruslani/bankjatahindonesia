"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Target, CheckCircle2 } from "lucide-react";

export default function ProgramSection({ program, index }) {
  const { title, status, shortDescription, fullDescription, steps, href, img } = program;

  const stepsLength = Array.isArray(steps) ? steps.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] hover:border-orange-200 transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Background Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      {/* Image Showcase Panel */}
      <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-8 bg-gray-50 flex-shrink-0">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Immersive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
          <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-orange-600 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg border border-white/50">
             <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            {status || "Program Aktif"}
          </span>
        </div>

        {/* Floating Steps Counter (If exists) */}
        {stepsLength > 0 && (
          <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
            <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
               <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
               {stepsLength} Langkah
            </span>
          </div>
        )}
      </div>

      {/* Content & Typography Section */}
      <div className="flex flex-col flex-grow relative z-10">
        
        {/* Section Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-50 mb-3 border border-orange-100">
            <Target className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
              Unggulan
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight tracking-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-500 line-clamp-2">
            {title}
          </h2>
        </div>

        {/* Dynamic Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mb-5 transform origin-left transition-transform duration-500 group-hover:scale-x-150" />

        {/* Short Text Description */}
        <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base mb-6 line-clamp-3 flex-grow">
          {shortDescription || fullDescription}
        </p>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <Link href={href} className="inline-block w-full">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 hover:border-orange-500 hover:bg-orange-500 text-gray-900 hover:text-white font-bold px-6 py-4 rounded-[1.5rem] shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] transition-all duration-300 group/btn"
            >
              <span className="uppercase tracking-widest text-xs sm:text-sm pl-2">Pelajari Detail</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover/btn:text-orange-600 transition-colors shadow-sm">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </div>
            </motion.button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
