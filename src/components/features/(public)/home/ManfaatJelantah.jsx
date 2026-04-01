"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, HandCoins, HeartHandshake } from "lucide-react";

export default function ManfaatJelantah() {
  const manfaatList = [
    {
      title: "Kurangi Pencemaran",
      desc: "Menghindari pembuangan minyak jelantah ke saluran air yang mencemari lingkungan.",
      icon: Recycle,
      delay: 0.2
    },
    {
      title: "Energi Terbarukan",
      desc: "Minyak jelantah diolah menjadi Biodiesel ramah lingkungan dan rendah emisi.",
      icon: Leaf,
      delay: 0.4
    },
    {
      title: "Keuntungan Digital",
      desc: "Ubah limbah menjadi saldo tabungan digital yang nyata dan menguntungkan.",
      icon: HandCoins,
      delay: 0.6
    },
    {
      title: "Tanggung Jawab Sosial",
      desc: "Menumbuhkan kepedulian bersama dalam mengelola limbah rumah tangga.",
      icon: HeartHandshake,
      delay: 0.8
    },
  ];

  return (
    <section id="manfaat" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Background Decoratives - Patterns & Glows */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#f97316 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.08)_0%,_transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.08)_0%,_transparent_40%)] pointer-events-none" />
      
      {/* Abstract Floating Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 1. Left Column: Header Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] uppercase tracking-tighter">
                Manfaat Utama <br />
                <span className="text-orange-500">Penyetoran</span> <br />
                Minyak Jelantah
              </h2>
            </div>
            
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-normal max-w-sm">
              Langkah sederhana Anda memberikan dampak nyata bagi kelestarian alam dan kesejahteraan ekonomi keluarga.
            </p>
          </motion.div>

          {/* 2. Center Column: Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex justify-center order-first lg:order-none"
          >
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-[8px] border-white/5 backdrop-blur-sm group">
              <img 
                src="/images/manfaat.jpeg" 
                alt="Manfaat Jelantah Visual" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* 3. Right Column: Benefits List */}
          <div className="lg:col-span-4 space-y-8 md:space-y-10">
            {manfaatList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                className="flex items-start gap-6 group"
              >
                {/* Circle Icon Container - Glassmorphic Dark */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-500 shadow-xl">
                  <item.icon className="w-6 h-6 text-white group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight group-hover:text-orange-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
