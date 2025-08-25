"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LanguageSelector({ languages }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleToggle = () => setOpen(!open);

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpen(false);
  };

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      {/* Trigger button */}
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-800 shadow-sm hover:border-[#FB6B00] hover:text-[#FB6B00] transition"
      >
        {currentLang.toUpperCase()}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute right-0 mt-2 w-32 rounded-lg bg-white border border-gray-200 shadow-lg py-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lng) => (
              <li key={lng}>
                <button
                  onClick={() => handleSelect(lng)}
                  className={`block w-full text-left px-4 py-2 text-sm transition hover:bg-gray-100 ${
                    currentLang === lng ? "text-[#FB6B00] font-semibold" : "text-gray-800"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
