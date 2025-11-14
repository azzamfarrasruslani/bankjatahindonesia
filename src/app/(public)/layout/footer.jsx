"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, ready } = useTranslation();
  const [kontak, setKontak] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchKontak();
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchKontak = async () => {
    const { data, error } = await supabase
      .from("kontak")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching kontak:", error);
    } else {
      setKontak(data);
    }
  };

  if (!ready || !kontak) return null;

  const quickLinks = [
    { label: t("navbar.beranda"), href: "/" },
    { label: t("navbar.program-kami"), href: "/program-kami" },
    { label: t("navbar.tentang-kami"), href: "/tentang-kami" },
    { label: t("navbar.lokasi"), href: "/lokasi" },
    { label: t("navbar.galeri"), href: "/galeri" },
  ];

  const infoLinks = [
    { label: t("navbar.artikel"), href: "/artikel" },
    { label: t("navbar.berita"), href: "/berita" },
    { label: t("navbar.faq"), href: "/faq" },
    { label: t("navbar.kontak"), href: "/kontak" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 xl:col-span-1"
            >
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo3.png"
                  alt="Bank Jatah Indonesia"
                  width={180}
                  height={60}
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Bank Jatah Indonesia adalah solusi inovatif pengelolaan minyak jelantah 
                melalui program berkelanjutan yang mengintegrasikan aspek ekonomi, sosial, 
                dan lingkungan.
              </p>
              
              {/* Social Media */}
              <div className="flex items-center gap-4">
                {kontak.facebook && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={kontak.facebook}
                    aria-label="Facebook"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 backdrop-blur-sm"
                  >
                    <Facebook size={18} className="text-white" />
                  </motion.a>
                )}
                {kontak.instagram && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={kontak.instagram}
                    aria-label="Instagram"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 backdrop-blur-sm"
                  >
                    <Instagram size={18} className="text-white" />
                  </motion.a>
                )}
                {kontak.email && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={`mailto:${kontak.email}`}
                    aria-label="Email"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-all duration-300 backdrop-blur-sm"
                  >
                    <Mail size={18} className="text-white" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Navigasi Cepat</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Informasi</h4>
              <ul className="space-y-3">
                {infoLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Kontak Kami</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Jl. Flamboyan No.7, Rumbai, Pekanbaru, Riau
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <a 
                    href={`mailto:${kontak.email}`}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {kontak.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <a
                    href={kontak.whatsapp_link || `https://wa.me/${kontak.whatsapp}`}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {kontak.telepon}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-white/20 mt-12 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4"
          >
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Bank Jatah Indonesia. All rights reserved.
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Kebijakan Privasi
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Syarat & Ketentuan
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}