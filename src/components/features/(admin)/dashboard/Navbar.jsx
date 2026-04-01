"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

const getDisplayName = (session) =>
  session?.user?.user_metadata?.full_name ||
  session?.user?.user_metadata?.name ||
  "Admin";

export default function Navbar({
  session,
  showSidebarTrigger = false,
  className,
}) {
  const displayName = getDisplayName(session);

  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showSidebarTrigger ? (
          <SidebarTrigger className="size-9 rounded-xl border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-[#FB6B00]" />
        ) : null}

        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Cari..."
            className="h-10 rounded-full border border-gray-300 pl-9 pr-4 text-sm focus:border-[#FB6B00] focus:outline-none focus:ring-1 focus:ring-[#FB6B00]"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative rounded-full p-2 transition hover:bg-gray-100">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <button className="hidden rounded-full p-2 transition hover:bg-gray-100 sm:block">
          <Settings size={18} className="text-gray-600" />
        </button>
        <div className="flex cursor-pointer items-center gap-2 rounded-full p-1 transition hover:bg-gray-100">
          <User size={20} className="text-gray-600" />
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
}
