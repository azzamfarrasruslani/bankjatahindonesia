// app/components/FloatingWAButton.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FloatingWAButton() {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white text-[#25D366] px-4 py-2 rounded-full shadow-md text-sm font-semibold"
          >
            Chat Kami
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/6281234567890" // Ganti dengan nomor WA asli
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        title="Hubungi via WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>
    </motion.div>
  );
}
