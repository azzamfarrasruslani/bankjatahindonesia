"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  // Auto close setelah duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Warna berdasarkan tipe
  const typeStyles = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-gray-900",
    error: "bg-red-500 text-white",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg ${typeStyles[type]}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
