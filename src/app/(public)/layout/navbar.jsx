"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import LanguageSelector from "@/components/layouts/navbar/LanguageSelector";
import ListMenu from "@/components/layouts/navbar/ListMenu";
import Icon from "@/lib/Icon";
import "@/lib/i18n";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { t, i18n, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const currentLang = i18n.language;
  const languages = ["id", "en"];
  
  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!ready || !mounted) return null;

  return (
    <motion.nav
      className={`fixed top-4 left-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] transform -translate-x-1/2 rounded-2xl backdrop-blur-md border transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 shadow-2xl border-gray-200/80 py-2"
          : "bg-white/90 shadow-lg border-gray-100 py-3"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Image
              src="/images/logo2.png"
              alt="Bank Jatah Indonesia"
              width={isScrolled ? 100 : 120}
              height={isScrolled ? 40 : 48}
              className="object-contain transition-all duration-300"
              priority
            />
          </motion.div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ListMenu />
        </div>

        {/* Right Section - Login & Language */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <LanguageSelector
            changeLanguage={changeLanguage}
            currentLang={currentLang}
            languages={languages}
          />
          
          {/* Login Button */}
          <Link href="/login">
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 group"
            >
              <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-semibold">
                {t("navbar.masuk")}
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Language Selector for Mobile */}
          <div className="md:hidden">
            <LanguageSelector
              changeLanguage={changeLanguage}
              currentLang={currentLang}
              languages={languages}
              mobile
            />
          </div>
          
          <motion.button 
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          >
            {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Dropdown dari bawah */}
      <AnimatePresence>
        {isOpen && (
          <>
           
            
            {/* Mobile Menu Content */}
            <motion.div
              className="fixed top-20 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Navigation Links */}
              <div className="p-4 space-y-2">
                <MobileNavItem href="/" label="Beranda" onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/tentang-kami" label="Tentang Kami" onClick={() => setIsOpen(false)} />
                
                {/* Dropdown Program */}
                <div className="border-b border-gray-100 pb-2">
                  <button
                    onClick={() => toggleDropdown('program')}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">Program</span>
                    <motion.div
                      animate={{ rotate: openDropdown === 'program' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === 'program' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-1 mt-2">
                          <MobileNavItem href="/program/tabungan-jelantah" label="Tabungan Jelantah" onClick={() => setIsOpen(false)} subItem />
                          <MobileNavItem href="/program/jual-beli-jelantah" label="Jual Beli Jelantah" onClick={() => setIsOpen(false)} subItem />
                          <MobileNavItem href="/program/sedekah-jelantah" label="Sedekah Jelantah" onClick={() => setIsOpen(false)} subItem />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavItem href="/mitra" label="Mitra" onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/artikel" label="Artikel" onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/faq" label="FAQ" onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/kontak" label="Kontak" onClick={() => setIsOpen(false)} />
              </div>

              {/* Mobile Login Button */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span>{t("navbar.masuk")}</span>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Mobile Navigation Item Component
const MobileNavItem = ({ href, label, onClick, subItem = false }) => (
  <Link href={href} onClick={onClick}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`p-3 rounded-lg hover:bg-gray-50 transition-colors ${
        subItem ? 'pl-6 text-sm' : 'font-medium'
      }`}
    >
      <span className={`${subItem ? 'text-gray-700' : 'text-gray-900'}`}>
        {label}
      </span>
    </motion.div>
  </Link>
);