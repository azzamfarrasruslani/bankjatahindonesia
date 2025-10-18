"use client";

import { Bell, User, Search, HelpCircle, Settings, MessageCircle, Grid } from "lucide-react";
import { FaBars } from "react-icons/fa";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 right-0 md:ml-64 bg-white shadow-md h-16 px-4 flex justify-between items-center z-30">
      {/* Kiri: tombol hamburger + search */}
      <div className="flex items-center gap-3">
        {/* Tombol hamburger hanya di mobile */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          <FaBars size={20} className="text-gray-700" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Cari..."
            className="pl-8 pr-3 py-1 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          />
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Kanan: Notif & Profil */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition hidden sm:block">
          <Settings size={18} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition rounded-full p-1">
          <User size={20} className="text-gray-600" />
          <span className="text-gray-700 font-medium text-sm hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
}
