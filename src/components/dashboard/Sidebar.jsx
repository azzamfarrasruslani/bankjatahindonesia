"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaCloudUploadAlt,
  FaWallet,
  FaUserFriends,
  FaShieldAlt,
  FaGift,
  FaLayerGroup,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "@/components/Logo";

// Menu utama
const menuItems = [
  { label: "Beranda", icon: FaHome, href: "/dashboard", exact: true },
  { label: "Setor Minyak", icon: FaCloudUploadAlt, href: "/dashboard/setor" },
  { label: "Wallet", icon: FaWallet, href: "/dashboard/wallet" },
  { label: "Mitra", icon: FaUserFriends, href: "/dashboard/mitra" },
  { label: "Validasi", icon: FaShieldAlt, href: "/dashboard/validasi" },
  { label: "Tukar Poin", icon: FaGift, href: "/dashboard/tukar-poin" },
  { label: "Program Jelantah", icon: FaLayerGroup, href: "/dashboard/program-jelantah" },
  { label: "Bantuan", icon: FaQuestionCircle, href: "/dashboard/bantuan" },
];

const logoutItem = {
  label: "Keluar",
  icon: FaSignOutAlt,
  href: "/logout",
};

export default function Sidebar() {
  const pathname = usePathname();

  const renderNavItem = (item, isLogout = false) => {
    const Icon = item.icon;
    const isActive = item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all group ${
          isActive
            ? "bg-[#FB6B00]/10 text-[#FB6B00] font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <div
          className={`p-2 rounded-md ${
            isActive ? "bg-[#FB6B00]/20" : "group-hover:bg-gray-200"
          }`}
        >
          <Icon size={18} />
        </div>
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 shadow-md fixed inset-y-0">
      {/* Logo Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
        <Logo size={120} />
      </div>

      {/* Navigasi */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        {renderNavItem(logoutItem, true)}
      </div>
    </aside>
  );
}
