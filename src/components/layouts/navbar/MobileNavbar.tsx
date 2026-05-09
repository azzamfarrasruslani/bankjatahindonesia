"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MobileNavbar({ setIsOpen, openDropdown, toggleDropdown }: any) {
  const router = useRouter();
  const ref = useRef();

  const handleNavigation = (path: any) => {
    setIsOpen(false);
    router.push(path);
  };

  // Tutup menu saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full right-4 left-4 mt-2 z-50 rounded-xl bg-white p-4 shadow-xl border border-gray-200 md:hidden"
    >
      {/* Tombol Tutup */}
      <div className="flex justify-end mb-2">
        <button onClick={() => setIsOpen(false)}>
          <X size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Login */}
      <div className="flex flex-col items-start gap-4 mb-4">
        <button
          onClick={() => handleNavigation("/login")}
          className="flex items-center gap-2 text-sm text-gray-800 hover:underline"
        >
          <User size={18} />
          Masuk / Daftar
        </button>
      </div>

      {/* Menu Utama */}
      <ul className="space-y-2 text-base font-medium text-gray-700">
        <li>
          <button
            onClick={() => handleNavigation("/")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
          >
            Beranda
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/tentang-kami")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
          >
            Tentang Kami
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/program-kami")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
          >
            Program Kami
          </button>
        </li>

        {/* Dropdown: Info & Artikel */}
        <li>
          <button
            onClick={() => toggleDropdown("info")}
            className="flex w-full justify-between items-center px-4 py-2 hover:bg-gray-100 rounded-md"
          >
            Info & Artikel
            {openDropdown === "info" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <AnimatePresence>
            {openDropdown === "info" && (
              <motion.div
                className="ml-4 flex flex-col gap-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={() => handleNavigation("/artikel")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  Artikel
                </button>
                <button onClick={() => handleNavigation("/berita")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  Berita
                </button>
                <button onClick={() => handleNavigation("/faq")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  FAQ
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Dropdown: Lainnya */}
        <li>
          <button
            onClick={() => toggleDropdown("lainnya")}
            className="flex w-full justify-between items-center px-4 py-2 hover:bg-gray-100 rounded-md"
          >
            Lainnya
            {openDropdown === "lainnya" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <AnimatePresence>
            {openDropdown === "lainnya" && (
              <motion.div
                className="ml-4 flex flex-col gap-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={() => handleNavigation("/kontak")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  Kontak
                </button>
                <button onClick={() => handleNavigation("/lokasi")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  Lokasi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </motion.div>
  );
}
