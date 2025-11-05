"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import LanguageSelector from "@/components/layouts/navbar/LanguageSelector";
import ListMenu from "@/components/layouts/navbar/ListMenu";
import MobileNavbar from "@/components/layouts/navbar/MobileNavbar";
import Icon from "@/lib/Icon";
import "@/lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { t, i18n, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const currentLang = i18n.language;
  const languages = ["id", "en"];
  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  if (!ready || !mounted) return null;

  return (
    <motion.nav
      className={`fixed top-10 left-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] transform -translate-x-1/2 rounded-xl backdrop-blur-md border bg-white shadow-md transition-all duration-300 ${
        scrollY > 20 ? "shadow-xl bg-white/90" : "shadow-md bg-white/80"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
              src="/images/logo2.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </motion.div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <ListMenu />
        </div>

        {/* Login & Language */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector
            changeLanguage={changeLanguage}
            currentLang={currentLang}
            languages={languages}
          />
          <Link href="/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FB6B00] text-white cursor-pointer transition"
            >
              <Icon name="user" className="text-white" />
              <span className="text-sm font-medium">
                {t("navbar.masuk")}
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={28} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 "
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <MobileNavbar
              setIsOpen={setIsOpen}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            />
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
