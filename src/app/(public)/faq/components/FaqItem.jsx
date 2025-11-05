"use client";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex justify-between items-center text-left font-semibold text-gray-800 hover:bg-orange-50 transition-colors duration-200 text-sm sm:text-base md:text-lg"
      >
        <span>{faq.q}</span>
        {isOpen ? (
          <HiChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300" />
        ) : (
          <HiChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 transition-transform duration-300" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 sm:px-6 md:px-8 pb-3 sm:pb-4 md:pb-5 text-gray-700 text-sm sm:text-base md:text-base bg-orange-50"
          >
            {faq.a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
