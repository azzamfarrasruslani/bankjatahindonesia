"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, ready } = useTranslation();
  const [kontak, setKontak] = useState(null);

  useEffect(() => {
    fetchKontak();
  }, []);

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

  // Quick Links sesuai ListMenu
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
    <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo3.png"
            alt="Logo Bank Jatah"
            width={160}
            height={50}
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            Bank Jatah Indonesia adalah solusi pengelolaan minyak jelantah melalui program tabungan, sedekah, dan jual beli jelantah secara ramah lingkungan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info & Artikel */}
        <div>
          <h4 className="text-lg font-semibold mb-3">{t("navbar.info-artikel")}</h4>
          <ul className="space-y-2 text-sm">
            {infoLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-lg font-semibold mb-3">{t("navbar.kontak")}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              <span>Jl. Flamboyan No.7, Rumbai, Pekanbaru, Riau</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href={`mailto:${kontak.email}`} className="hover:underline">
                {kontak.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href={kontak.whatsapp_link || `https://wa.me/${kontak.whatsapp}`}
                className="hover:underline"
              >
                {kontak.telepon}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Bank Jatah Indonesia. All rights reserved.</p>

        <div className="flex gap-4">
          {kontak.facebook && (
            <a href={kontak.facebook} aria-label="Facebook" className="hover:text-gray-200">
              <Facebook size={18} />
            </a>
          )}
          {kontak.instagram && (
            <a href={kontak.instagram} aria-label="Instagram" className="hover:text-gray-200">
              <Instagram size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
