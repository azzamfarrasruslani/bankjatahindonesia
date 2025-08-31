"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
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

  useEffect(() => {
    setMounted(true); // render hanya di client
  }, []);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const currentLang = i18n.language;
  const languages = ["id", "en"];

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  if (!ready || !mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={130}
            height={130}
            priority
          />
        </Link>

        {/* Desktop Menu */}
    <div className="hidden md:flex flex-1 justify-center text-sm font-medium leading-none">
          <ListMenu />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector
            changeLanguage={changeLanguage}
            currentLang={currentLang}
            languages={languages}
          />
          <Link href="/login">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg transition hover:text-[#FB6B00]">
              <Icon name="user" className="text-gray-700" />
              <p className="text-sm font-medium text-gray-800">
                {t("navbar.masuk")} / {t("navbar.daftar")}
              </p>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Slide */}
            <MobileNavbar
              setIsOpen={setIsOpen}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
