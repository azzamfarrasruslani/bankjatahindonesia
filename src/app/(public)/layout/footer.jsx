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
    <footer className="relative bg-[#0a0a0a] text-white pt-20 overflow-hidden mt-auto">
      {/* Background Decoratives - Patterns & Glows */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#f97316 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.05)_0%,_transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.05)_0%,_transparent_40%)] pointer-events-none" />

      {/* 1. Newsletter / CTA Top Band */}
      <div className="relative z-10 container mx-auto px-6 mb-20">
        <div className="rounded-[2.5rem] p-10 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-6 overflow-hidden relative min-h-[350px] text-center border border-white/5">
          {/* Background Image with Dark Professional Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/parallax.jpeg" 
              alt="Background" 
              fill 
              className="object-cover opacity-60" 
            />
            {/* Sophisticated Dark Gradient instead of heavy orange */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/40 to-gray-950/90" />
            <div className="absolute inset-0 bg-orange-600/10" />
          </div>
          
          <div className="max-w-3xl space-y-6 relative z-10 px-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
              Ayo Berkontribusi <br />
              <span className="text-orange-500">Untuk Lingkungan</span>
            </h3>
            <p className="text-gray-300 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Mulai langkah kecil Anda hari ini dengan mengelola limbah minyak jelantah secara bijak bersama <span className="text-white font-semibold">Bank Jatah Indonesia</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* 2. Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand & Intro Column (Lg:col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <Link href="/" className="inline-block group">
              <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl w-fit border border-white/10 shadow-xl group-hover:border-orange-500/30 transition-all duration-500">
                <Image
                  src="/images/logo3.png"
                  alt="Bank Jatah Indonesia"
                  width={160}
                  height={50}
                  className="object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-normal max-w-sm">
              Inovasi pengelolaan limbah minyak jelantah untuk menciptakan ekosistem sirkulasi ekonomi hijau yang berkelanjutan bagi masa depan Indonesia yang lebih sehat.
            </p>
            
            {/* Social Media - Premium Style */}
            <div className="flex items-center gap-4">
              {kontak.facebook && (
                <Link href={kontak.facebook} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group shadow-lg">
                  <Facebook size={20} className="text-white/60 group-hover:text-white group-hover:fill-current" />
                </Link>
              )}
              {kontak.instagram && (
                <Link href={kontak.instagram} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group shadow-lg">
                  <Instagram size={20} className="text-white/60 group-hover:text-white" />
                </Link>
              )}
              {kontak.email && (
                <Link href={`mailto:${kontak.email}`} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group shadow-lg">
                  <Mail size={20} className="text-white/60 group-hover:text-white" />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Navigation Links Columns (Lg:col-span-2 each) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] border-l-2 border-orange-500 pl-4 h-fit">
              Navigasi
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-white/50 hover:text-orange-500 font-normal transition-colors duration-300 text-sm block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] border-l-2 border-orange-500 pl-4 h-fit">
              Informasi
            </h4>
            <ul className="space-y-4">
              {infoLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-white/50 hover:text-orange-500 font-normal transition-colors duration-300 text-sm block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Glass-Panel (Lg:col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
              {/* Internal glow for panel */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px]" />
              
              <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 relative z-10">
                Kontak Kami
              </h4>
              
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} className="text-orange-500" />
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed font-normal">
                    Jl. Flamboyan No.7, Rumbai, Pekanbaru, Riau
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-orange-500" />
                  </div>
                  <a href={`mailto:${kontak.email}`} className="text-white/60 hover:text-orange-500 transition-colors text-sm font-normal truncate">
                    {kontak.email}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-orange-500" />
                  </div>
                  <a href={kontak.whatsapp_link || `https://wa.me/${kontak.whatsapp}`} target="_blank" className="text-white/60 hover:text-orange-500 transition-colors text-sm font-normal">
                    {kontak.telepon}
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 3. Bottom Strip */}
        <div className="pt-8 pb-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-[xs md:text-sm font-normal text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-white font-bold">Bank Jatah Indonesia</span>. Hak Cipta Dilindungi.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-black text-white/30 uppercase tracking-[0.1em]">
            <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms-of-service" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</Link>
            <Link href="/sitemap" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top - Premium Style */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(249,115,22,0.4)] hover:bg-white hover:text-orange-600 transition-all duration-500 group"
          >
            <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
