"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

export default function LokasiFilter({
  filterJenis,
  setFilterJenis,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 mb-10 mt-[-40px] relative z-30 mx-4 sm:mx-8 lg:mx-12"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Search Input */}
        <div className="relative w-full md:w-[60%] group/input">
          <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 opacity-70 group-hover/input:opacity-100 transition-opacity">
            Cari Berdasarkan Nama / Alamat
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover/input:text-orange-500 transition-colors z-10 bg-white p-1">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Cari lokasi bank sampah terdekat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-[1.2rem] border-2 border-gray-100 focus:ring-0 focus:border-orange-500 bg-gray-50/50 hover:bg-white outline-none transition-all shadow-sm placeholder-gray-300 text-gray-900 font-medium"
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full md:w-[40%] group/select">
          <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 opacity-70 group-hover/select:opacity-100 transition-opacity">
            Filter Kategori Lokasi
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover/select:text-orange-500 transition-colors z-10 bg-white p-1 pointer-events-none">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="w-full pl-16 pr-10 py-4 rounded-[1.2rem] border-2 border-gray-100 focus:ring-0 focus:border-orange-500 bg-gray-50/50 hover:bg-white outline-none transition-all shadow-sm text-gray-900 font-medium appearance-none cursor-pointer"
            >
              <option value="semua">Semua Titik Penjemputan</option>
              <option value="utama">Lokasi Utama (Kantor/Pusat)</option>
              <option value="mitra">Titik Mitra (Unit Bisnis)</option>
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
