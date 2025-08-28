"use client";

import { motion } from "framer-motion";
import { Users, Home, Factory } from "lucide-react";

export default function TargetPasar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-white p-8 md:p-12 rounded-2xl shadow-md mb-16 border border-gray-100"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-[#FB6B00] mb-6 text-center md:text-left">
        Target Pasar
      </h2>

      {/* Flex container: teks + barrel sejajar */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        
        {/* Bagian teks */}
        <div className="flex-1">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            Potensi jelantah nasional mencapai{" "}
            <span className="text-[#FB6B00] font-bold text-xl">933.000 KL</span> per tahun.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Factory className="text-[#FB6B00]" />
              <span>
                Industri makanan:{" "}
                <span className="text-[#FB6B00] font-semibold">714.296,6 KL</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Home className="text-[#FB6B00]" />
              <span>
                Hotel, restoran, kafe & rumah tangga:{" "}
                <span className="text-[#FB6B00] font-semibold">218.871,7 KL</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Users className="text-[#FB6B00]" />
              <span>
                Target utama: rumah tangga & UMKM sebagai penggerak ekosistem.
              </span>
            </div>
          </div>
        </div>

        {/* Barrel visual */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-28 h-56 rounded-xl border-2 border-gray-300 bg-gray-50 shadow-inner overflow-hidden flex flex-col justify-between">
            
            {/* Isi minyak */}
            <motion.div
              className="absolute bottom-0 w-full bg-gradient-to-t from-[#FB6B00] via-[#FB6B00]/90 to-[#FB6B00]/60"
              initial={{ height: 0 }}
              whileInView={{ height: "70%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

           
            {/* Label angka */}
            <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-white z-20">
              <span className="text-2xl md:text-3xl">933K</span>
              <span className="text-sm md:text-base">KL</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
