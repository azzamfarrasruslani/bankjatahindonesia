"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DropdownLink({ items = [], selected }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = items.some((item) => pathname === item.path);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative inline-flex items-center gap-1 px-2 py-1 text-sm font-medium leading-none transition duration-300 ${
          isActive ? "text-[#FB6B00] font-semibold" : "text-gray-700 hover:text-[#FB6B00]"
        }`}
      >
        {selected}
        <svg
          className="h-4 w-4 mt-[1px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>

        <span
          className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#FB6B00] transform transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

     <AnimatePresence>
  {isOpen && (
    <motion.ul
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute z-50 mt-2 w-52 rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-2 space-y-1"
    >
      {items.map((item, i) => {
        const active = pathname === item.path;
        return (
          <li key={i}>
            <Link
              href={item.path}
              className={`group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
                active
                  ? "bg-orange-50 text-[#FB6B00] font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#FB6B00]"
              }`}
            >
              {/* Bullet indikator aktif */}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active ? "bg-[#FB6B00] scale-100" : "scale-0"
                }`}
              />
              {item.label}
            </Link>
          </li>
        );
      })}
    </motion.ul>
  )}
</AnimatePresence>

    </div>
  );
}
