"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import LanguageSelector from "../../components/layouts/navbar/LanguageSelector";
import ListMenu from "../../components/layouts/navbar/ListMenu";
import MobileNavbar from "../../components/layouts/navbar/MobileNavbar";
import Icon from "../../lib/Icon";
import "../../lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const currentLang = i18n.language;
  const languages = ["id", "en"];

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <>
      

      {/* Navbar utama */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={150}
              height={150}
              priority
            />
          </Link>

          {/* Menu tengah desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <ListMenu />
          </div>

          {/* Action kanan desktop */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector
              changeLanguage={changeLanguage}
              currentLang={currentLang}
              languages={languages}
            />
            <Link href="/login">
              <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition duration-300">
                <Icon name="user" className="text-md text-gray-800" />
                <p className="text-sm font-medium text-gray-800">
                  {t("navbar.masuk")} / {t("navbar.daftar")}
                </p>
              </div>
            </Link>
          </div>

          {/* Hamburger mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar + Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50"
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
      </nav>
    </>
  );
}
