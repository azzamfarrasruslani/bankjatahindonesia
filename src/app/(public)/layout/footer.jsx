"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";
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
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching kontak:", error);
    } else {
      setKontak(data || {});
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
    <footer className="bg-black text-white relative overflow-hidden flex flex-col pt-16 mt-auto">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent blur-[100px]" />
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

      {/* Scroll to Top Premium Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-orange-500 hover:bg-white text-white hover:text-orange-500 rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center justify-center transition-all duration-300 group ring-4 ring-orange-500/20"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 mb-16">
          {/* Brand Identity Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="xl:col-span-5 flex flex-col"
          >
            <Link href="/" className="inline-block mb-8">
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-2xl w-fit border border-white/10">
                <Image
                  src="/images/logo3.png"
                  alt="Bank Jatah Indonesia"
                  width={180}
                  height={60}
                  className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-md font-light text-base/7">
              Bank Jatah Indonesia menginovasi cara kita mengelola sisa minyak
              dapur. Bersama-sama, kita wujudkan sirkulasi ekonomi hijau yang
              lebih berkelanjutan.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              {kontak.facebook && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -4 }}
                  href={kontak.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 rounded-full border border-gray-800 bg-gray-900/50 flex items-center justify-center hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300 backdrop-blur-sm text-gray-400 group"
                >
                  <Facebook size={20} className="group-hover:fill-current" />
                </motion.a>
              )}
              {kontak.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -4 }}
                  href={kontak.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full border border-gray-800 bg-gray-900/50 flex items-center justify-center hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300 backdrop-blur-sm text-gray-400 group"
                >
                  <Instagram size={20} />
                </motion.a>
              )}
              {kontak.email && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -4 }}
                  href={`mailto:${kontak.email}`}
                  aria-label="Email"
                  className="w-12 h-12 rounded-full border border-gray-800 bg-gray-900/50 flex items-center justify-center hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300 backdrop-blur-sm text-gray-400 group"
                >
                  <Mail size={20} className="group-hover:fill-current" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="xl:col-span-2"
          >
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Navigasi
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-3 group font-light"
                  >
                    <div className="w-4 h-0.5 bg-gray-800 group-hover:bg-orange-500 group-hover:w-6 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info Links Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="xl:col-span-2"
          >
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Informasi
            </h4>
            <ul className="space-y-4">
              {infoLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-3 group font-light"
                  >
                    <div className="w-4 h-0.5 bg-gray-800 group-hover:bg-orange-500 group-hover:w-6 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="xl:col-span-3 bg-gray-900/40 rounded-[2rem] p-8 border border-gray-800 shadow-inner"
          >
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">
              Kontak Kami
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-orange-500/20">
                  <MapPin size={18} className="text-orange-500" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed font-light mt-1">
                  Jl. Flamboyan No.7, Rumbai, Pekanbaru, Riau
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 border border-orange-500/20">
                  <Mail size={18} className="text-orange-500" />
                </div>
                <a
                  href={`mailto:${kontak.email}`}
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm font-light truncate"
                >
                  {kontak.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 border border-orange-500/20">
                  <Phone size={18} className="text-orange-500" />
                </div>
                <a
                  href={
                    kontak.whatsapp_link || `https://wa.me/${kontak.whatsapp}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm font-light"
                >
                  {kontak.telepon}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800/80 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright Text */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm font-light">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-white font-medium">
                Bank Jatah Indonesia
              </span>
              . Hak Cipta Dilindungi.
            </p>
          </div>

          {/* Legal Links Panel */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-light">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
            >
              Syarat & Ketentuan
            </Link>
            <Link
              href="/sitemap"
              className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
