"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, HandCoins, Building2, Landmark, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col w-full overflow-hidden bg-white pt-24 md:pt-32 pb-20">
      {/* Subtle Background decoration elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-100/40 blur-[100px] rounded-full -z-10" />
      
      <div className="relative z-10 w-full h-full container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start pt-6 lg:pt-10 order-2 lg:order-1"
          >
            <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.1] text-black mb-8 tracking-tight max-w-xl">
              Ubah Minyak <br />
              Jelantah Jadi <br />
              <span className="text-orange-500 font-extrabold">Ekonomi Pasti</span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl font-normal max-w-md mb-10 leading-relaxed font-sans">
              Dapatkan keuntungan ekonomi langsung dari sisa minyak goreng Anda. Kami kelola secara profesional untuk masa depan yang lebih hijau.
            </p>

            <motion.a
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              href="#mitra"
              className="group px-10 py-5 bg-orange-500 text-white font-bold rounded-full flex items-center gap-3 transition-all shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_25px_50px_rgba(249,115,22,0.4)]"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Social Proof (Trusted By) - Final Gap Reduction */}
            <div className="mt-8 w-full pt-4 border-t border-gray-50">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                TELAH DIPERCAYA OLEH
              </p>
              <div className="flex flex-wrap items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                 <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-black" />
                    <span className="text-black font-black text-lg tracking-tighter">BUMN Inc</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-black" />
                    <span className="text-black font-black text-lg tracking-tighter">Bank Daerah</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual (The Box and Floating Elements) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full flex justify-center lg:justify-end order-1 lg:order-2"
          >
            {/* The Main Image Wrap */}
            <div className="relative w-full max-w-[620px] aspect-square overflow-visible group">
               {/* Main Card Shape with Subtle Tilt Effect */}
               <motion.div 
                 whileHover={{ rotate: -1, scale: 1.01 }}
                 className="w-full h-full bg-gray-50 rounded-[4rem] overflow-hidden border border-gray-100 shadow-2xl relative"
               >
                  <img 
                    src="/images/hero.webp" 
                    alt="Process Illustration" 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-90" />
               </motion.div>

               {/* Floating Element 1: Stat Card with Idle Floating Animation */}
               <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  y: [0, -12, 0]
                }}
                transition={{ 
                  x: { delay: 0.6, duration: 0.8 },
                  opacity: { delay: 0.6, duration: 0.8 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                className="absolute left-[-10%] bottom-[30%] z-30 px-8 py-5 bg-white border border-gray-100 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.15)] flex items-center gap-5 cursor-default"
               >
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-inner">
                    <HandCoins className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-black font-black text-lg leading-tight">+ Rp 150.000</p>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">Keuntungan Anda</p>
                  </div>
               </motion.div>

               {/* Floating Element 2: Status Card with Idle Floating Animation */}
               <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  y: [0, 10, 0] 
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  opacity: { delay: 0.8 },
                  initialY: { delay: 0.8 }
                }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                className="absolute right-[-2%] bottom-[5%] z-40 px-8 py-7 bg-white border border-gray-100 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.18)] flex flex-col gap-4 min-w-[260px] cursor-default"
               >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-black text-sm font-black tracking-tight">Setoran Diverifikasi</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]" 
                       />
                    </div>
                  </div>
               </motion.div>

               {/* Floating Element 3: Impact Card with Idle Floating Animation */}
               <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  y: [0, -8, 0]
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 },
                  opacity: { delay: 1 },
                  initialY: { delay: 1 }
                }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="absolute top-[5%] right-[-5%] z-40 px-7 py-4 bg-green-500 border border-green-400 rounded-2xl shadow-2xl flex items-center gap-3 cursor-default"
               >
                  <TrendingUp className="w-5 h-5 text-white" />
                  <span className="text-white text-xs font-black uppercase tracking-widest">Dampak Hijau</span>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
