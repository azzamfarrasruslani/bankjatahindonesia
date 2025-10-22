"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaNewspaper,
  FaLayerGroup,
  FaUsers,
  FaImage,
  FaEnvelope,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Gagal logout:", error.message);
    }
  };

  const menuItems = [
    { label: "Dashboard", icon: FaHome, href: "/dashboard", exact: true },
    {
      label: "Profil Perusahaan",
      icon: FaInfoCircle,
      href: "/dashboard/profil",
    },
    { label: "Berita & Artikel", icon: FaNewspaper, href: "/dashboard/berita" },
    {
      label: "Program Jelantah",
      icon: FaLayerGroup,
      href: "/dashboard/program",
    },
    { label: "Galeri", icon: FaImage, href: "/dashboard/galeri" },
     {
      label: "Manajemen Lokasi",
      icon: FaMapMarkerAlt,
      href: "/dashboard/lokasi",
    },
    { label: "Testimoni", icon: FaUsers, href: "/dashboard/testimoni" },
    { label: "Kontak & Pesan", icon: FaEnvelope, href: "/dashboard/kontak" },
    { label: "FAQ / Bantuan", icon: FaQuestionCircle, href: "/dashboard/faq" },
    { label: "Pengaturan", icon: FaCog, href: "/dashboard/pengaturan" },
  ];

  const logoutItem = { label: "Keluar", icon: FaSignOutAlt };

  const renderNavItem = (item, isLogout = false) => {
    const Icon = item.icon;
    const isActive = item.exact
      ? pathname === item.href
      : pathname?.startsWith(item.href);

    const baseClasses =
      "flex items-center gap-3 px-4 py-2 rounded-lg transition-all group text-sm";
    const activeClasses = isActive
      ? "bg-[#FB6B00]/10 text-[#FB6B00] font-semibold"
      : "text-gray-700 hover:bg-gray-100";

    if (isLogout) {
      return (
        <button
          key={item.label}
          onClick={handleLogout}
          className={`${baseClasses} ${activeClasses} w-full`}
        >
          <div className="p-2 rounded-md group-hover:bg-gray-200">
            <Icon size={18} />
          </div>
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`${baseClasses} ${activeClasses}`}
      >
        <div
          className={`p-2 rounded-md ${
            isActive ? "bg-[#FB6B00]/20" : "group-hover:bg-gray-200"
          }`}
        >
          <Icon size={18} />
        </div>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 shadow-md fixed inset-y-0">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
          <Logo size={120} />
        </div>
        <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => renderNavItem(item))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
          {renderNavItem(logoutItem, true)}
        </div>
      </aside>

      {/* Sidebar Mobile dengan animasi Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay hitam */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            {/* Sidebar animasi */}
            <motion.aside
              className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg border-r border-gray-200 flex flex-col"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
                <Logo size={100} />
              </div>
              <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => renderNavItem(item))}
              </nav>
              <div className="px-4 py-4 border-t border-gray-200">
                {renderNavItem(logoutItem, true)}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
