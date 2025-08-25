"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DropdownLink({ items = [], selected, onSelect = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleSelect = (item) => {
    onSelect(item.label);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 transition duration-300 hover:text-[#FB6B00]"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.97 }}
      >
        {selected}
        <motion.svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, i) => (
              <li key={i} onClick={() => handleSelect(item)}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 text-sm transition duration-200 ${
                    pathname === item.path
                      ? "text-[#FB6B00] font-semibold bg-orange-50"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#FB6B00]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
