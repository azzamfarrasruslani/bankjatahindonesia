"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-l-4 border-[#FB6B00] bg-white border-opacity-60 rounded-xl overflow-hidden shadow-sm transition">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-medium text-lg text-gray-800 hover:bg-orange-50"
      >
        <span className="flex gap-2 items-center">
          <span>❓</span> {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4 text-gray-700 text-base leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
