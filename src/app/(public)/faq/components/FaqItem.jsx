"use client";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-gray-800 hover:bg-orange-50 transition-colors duration-200"
      >
        <span className="text-lg md:text-xl">{faq.q}</span>
        {isOpen ? (
          <HiChevronUp className="w-6 h-6 text-orange-500 transition-transform duration-300" />
        ) : (
          <HiChevronDown className="w-6 h-6 text-orange-500 transition-transform duration-300" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-5 text-gray-700 text-sm md:text-base bg-orange-50">
          {faq.a}
        </div>
      )}
    </div>
  );
}
