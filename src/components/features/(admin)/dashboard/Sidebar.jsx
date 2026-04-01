"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  ChevronRight,
  CircleHelp,
  FileText,
  Images,
  Layers3,
  LogOut,
  Mail,
  MapPinned,
  Newspaper,
  Quote,
  UserCog,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  Sidebar as AppSidebarShell,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    label: "Profil Perusahaan",
    icon: Building2,
    href: "/dashboard/profil",
  },
  {
    label: "Berita & Artikel",
    icon: Newspaper,
    subItems: [
      { label: "Berita", href: "/dashboard/berita", icon: Newspaper },
      { label: "Artikel", href: "/dashboard/artikel", icon: FileText },
    ],
  },
  {
    label: "Program Jelantah",
    icon: Layers3,
    href: "/dashboard/program",
  },
  { label: "Galeri", icon: Images, href: "/dashboard/galeri" },
  { label: "Lokasi", icon: MapPinned, href: "/dashboard/lokasi" },
  { label: "Testimoni", icon: Quote, href: "/dashboard/testimoni" },
  { label: "Kontak & Pesan", icon: Mail, href: "/dashboard/kontak" },
  { label: "FAQ / Bantuan", icon: CircleHelp, href: "/dashboard/faq" },
  { label: "Pengguna", icon: UserCog, href: "/dashboard/users" },
];

const sidebarStyles = {
  "--sidebar": "#ffffff",
  "--sidebar-foreground": "#374151",
  "--sidebar-primary": "#fb6b00",
  "--sidebar-primary-foreground": "#ffffff",
  "--sidebar-accent": "rgb(251 107 0 / 0.10)",
  "--sidebar-accent-foreground": "#fb6b00",
  "--sidebar-border": "#e5e7eb",
  "--sidebar-ring": "rgb(251 107 0 / 0.25)",
};

const getUserDisplayName = (session) =>
  session?.user?.user_metadata?.full_name ||
  session?.user?.user_metadata?.name ||
  session?.user?.email?.split("@")[0] ||
  "Administrator";

export default function Sidebar({ session }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      if (isMobile) {
        setOpenMobile(false);
      }
      router.replace("/login");
    } catch (error) {
      console.error("Gagal logout:", error.message);
    }
  };

  const handleNavigate = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const userName = getUserDisplayName(session);
  const userEmail = session?.user?.email || "Panel admin Bank Jatah Indonesia";
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <AppSidebarShell
      collapsible="icon"
      className="border-r border-sidebar-border/70 shadow-sm"
      style={sidebarStyles}
    >
      <SidebarHeader className="border-b border-sidebar-border/70 px-3 py-4 group-data-[collapsible=icon]:p-2">
        <Link
          href="/dashboard"
          onClick={handleNavigate}
          className="flex items-center justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white px-3 py-4 transition hover:border-orange-200 hover:shadow-sm group-data-[collapsible=icon]:p-2"
        >
          <div className="group-data-[collapsible=icon]:hidden">
            <Logo size={116} />
          </div>
          <div className="hidden size-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FB6B00] text-sm font-bold text-white group-data-[collapsible=icon]:flex">
            BJ
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 group-data-[collapsible=icon]:hidden">
            Menu Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const isActive = item.subItems
                  ? item.subItems.some((sub) => pathname.startsWith(sub.href))
                  : pathname.startsWith(item.href);
                const isOpen = openDropdowns[item.label] ?? isActive;
                const Icon = item.icon;

                if (!item.subItems) {
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="h-11 rounded-xl px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                      >
                        <Link href={item.href} onClick={handleNavigate} className="flex items-center gap-2">
                          <Icon className="shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      type="button"
                      isActive={isActive}
                      tooltip={item.label}
                      className="h-11 rounded-xl px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          "ml-auto size-4 shrink-0 transition-transform group-data-[collapsible=icon]:hidden",
                          isOpen && "rotate-90"
                        )}
                      />
                    </SidebarMenuButton>

                    {isOpen ? (
                      <SidebarMenuSub className="mt-1">
                        {item.subItems.map((sub) => {
                          const SubIcon = sub.icon;
                          const subActive = pathname.startsWith(sub.href);

                          return (
                            <SidebarMenuSubItem key={sub.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subActive}
                                className="rounded-lg text-slate-600 data-[active=true]:bg-[#FB6B00]/10 data-[active=true]:font-medium data-[active=true]:text-[#FB6B00]"
                              >
                                <Link href={sub.href} onClick={handleNavigate} className="flex items-center gap-2">
                                  <SubIcon className="size-4 shrink-0" />
                                  <span className="group-data-[collapsible=icon]:hidden">{sub.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="gap-3 px-2 py-3">
        <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 px-3 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FB6B00] text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-slate-900">
              {userName}
            </p>
            <p className="truncate text-xs text-slate-500">{userEmail}</p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              tooltip="Keluar"
              className="h-11 rounded-xl px-3 text-red-600 hover:bg-red-50 hover:text-red-600 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              onClick={handleLogout}
            >
              <LogOut className="shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </AppSidebarShell>
  );
}
