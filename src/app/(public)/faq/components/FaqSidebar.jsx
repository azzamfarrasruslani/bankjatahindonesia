"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass } from "lucide-react";

export default function FaqSidebar({
  faqData,
  scrollToCategory,
  activeIndex,
  sidebarOpen,
  setSidebarOpen,
  isDesktop,
}) {
  return (
    <>
      {/* Overlay untuk mobile */}
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar container */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white lg:bg-transparent shadow-2xl lg:shadow-none z-50 lg:static lg:h-auto overflow-y-auto lg:overflow-visible`}
        initial={{ x: !isDesktop ? "-100%" : 0 }}
        animate={{ x: !isDesktop ? (sidebarOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col p-6 lg:p-0">
          {/* Header Sidebar Mobile */}
          {!isDesktop && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                Kategori FAQ
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Sticky Nav Widget for Desktop */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Title Group */}
            <div className="hidden lg:block space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-50 border border-orange-100 mb-2">
                <Compass className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                  Navigasi
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                Jelajahi
                <br />
                Topik
              </h3>
            </div>

            {/* Categories List */}
            <div className="flex flex-col gap-2">
              {faqData.map((section, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => scrollToCategory(index)}
                    className={`group relative flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 w-full overflow-hidden text-left
                       ${
                         isActive
                           ? "bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] border border-orange-400"
                           : "bg-white hover:bg-orange-50 text-gray-600 hover:text-orange-600 border border-transparent hover:border-orange-100"
                       }`}
                  >
                    {/* Hover Background Effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    )}

                    <span className="relative z-10">{section.category}</span>

                    {/* Indicator */}
                    <span
                      className={`relative z-10 w-2 h-2 rounded-full transition-all duration-300 ${isActive ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-gray-200 group-hover:bg-orange-300 group-hover:scale-150"}`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Help Card */}
            <div className="hidden lg:flex flex-col items-center text-center p-6 bg-gray-900 rounded-[2rem] relative overflow-hidden mt-8">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                <Search className="w-5 h-5 text-orange-400" />
              </div>
              <h4 className="text-white font-bold mb-2">Belum Terjawab?</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Tim support kami siap membantu pertanyaan spesifik Anda.
              </p>
              <a
                href="/kontak"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
