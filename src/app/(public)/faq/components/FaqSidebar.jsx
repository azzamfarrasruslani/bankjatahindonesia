"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function FaqSidebar({ faqData, scrollToCategory, activeIndex, sidebarOpen, setSidebarOpen, isDesktop }) {
  return (
    <>
      {/* Overlay untuk mobile */}
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar container */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 lg:static lg:h-auto lg:shadow-none lg:bg-transparent overflow-y-auto`}
        initial={{ x: !isDesktop ? "-100%" : 0 }}
        animate={{ x: !isDesktop ? (sidebarOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col gap-2 p-4 lg:p-0">
          <h3 className="text-lg font-bold text-gray-800 mb-4 lg:mb-2">Kategori FAQ</h3>
          {faqData.map((section, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => scrollToCategory(index)}
                className={`flex items-center justify-between px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 mb-2 w-full
                  ${isActive
                    ? "bg-orange-200 shadow-md text-orange-700"
                    : "bg-orange-50 hover:bg-orange-100 text-orange-600"
                  }`}
              >
                <span>{section.category}</span>
                {isActive && <span className="w-2 h-2 bg-orange-600 rounded-full ml-2" />}
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
