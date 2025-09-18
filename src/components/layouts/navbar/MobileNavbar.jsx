"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp, X, User, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import LanguageSelector from "./LanguageSelector";

export default function MobileNavbar({ setIsOpen, openDropdown, toggleDropdown }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLang = i18n.language;
  const languages = ["id", "en"];

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-[9999] h-full w-72 bg-white p-6 md:hidden overflow-y-auto shadow-lg"
    >
      {/* Tombol Tutup */}
      <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
        <X size={28} />
      </button>

      {/* Language & Login */}
      <div className="flex flex-col items-start gap-4 mb-8 px-4">
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-gray-700" />
          <LanguageSelector
            changeLanguage={changeLanguage}
            currentLang={currentLang}
            languages={languages}
          />
        </div>
        <button
          onClick={() => handleNavigation("/login")}
          className="flex items-center gap-2 text-sm text-gray-800 hover:underline"
        >
          <User size={18} />
          {t("navbar.masuk")} / {t("navbar.daftar")}
        </button>
      </div>

      {/* Menu */}
      <ul className="space-y-2 text-base font-medium">
        <li>
          <button
            onClick={() => handleNavigation("/buy-cars")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {t("navbar.beli-mobil")}
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/sell-cars")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {t("navbar.jual-mobil")}
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/faq")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {t("FAQ")}
          </button>
        </li>

        {/* Dropdown: Tentang */}
        <li>
          <button
            onClick={() => toggleDropdown("tentang")}
            className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100"
          >
            {t("navbar.tentang-mobilin")}
            {openDropdown === "tentang" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {openDropdown === "tentang" && (
            <motion.div
              key="tentang"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-4 overflow-hidden"
            >
              <button
                onClick={() => handleNavigation("/tentang-kami")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.tentang-kami")}
              </button>
              <button
                onClick={() => handleNavigation("/artikel")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.artikel")}
              </button>
              <button
                onClick={() => handleNavigation("/kontak-kami")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.kontak-kami")}
              </button>
              <button
                onClick={() => handleNavigation("/lokasi-kami")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.lokasi-kami")}
              </button>
            </motion.div>
          )}
        </li>

        {/* Dropdown: Lainnya */}
        <li>
          <button
            onClick={() => toggleDropdown("lainnya")}
            className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100"
          >
            {t("navbar.lainnya")}
            {openDropdown === "lainnya" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {openDropdown === "lainnya" && (
            <motion.div
              key="lainnya"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-4 overflow-hidden"
            >
              <button
                onClick={() => handleNavigation("/karir")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.karir")}
              </button>
              <button
                onClick={() => handleNavigation("/simulasi-kredit")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.simulasi-kredit")}
              </button>
              <button
                onClick={() => handleNavigation("/katalog-media")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {t("navbar.katalog-media")}
              </button>
            </motion.div>
          )}
        </li>
      </ul>
    </motion.div>
  );
}
