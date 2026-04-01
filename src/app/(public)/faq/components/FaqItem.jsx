"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-500 ease-out 
        ${
          isOpen
            ? "border-orange-200 bg-white shadow-[0_10px_30px_rgba(249,115,22,0.08)] scale-[1.01]"
            : "border-gray-100 bg-white shadow-sm hover:border-orange-100 hover:shadow-md"
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-5 sm:px-6 md:px-8 py-4 sm:py-5 flex justify-between items-center text-left transition-colors duration-300 group"
      >
        <span
          className={`font-bold text-sm sm:text-base md:text-lg pr-6 transition-colors duration-300 ${isOpen ? "text-orange-600" : "text-gray-900 group-hover:text-orange-500"}`}
        >
          {faq.q}
        </span>

        {/* Animated Icon Button */}
        <div
          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 
            ${
              isOpen
                ? "bg-orange-500 text-white shadow-md rotate-180"
                : "bg-gray-50 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500 rotate-0"
            }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
          ) : (
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }} /* Smooth bezier curve */
          >
            <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed font-light">
              <div className="border-t border-gray-100/60 pt-4">{faq.a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
