"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/features/(admin)/dashboard/Sidebar";
import Navbar from "@/components/features/(admin)/dashboard/Navbar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.replace("/login");
        return;
      }
      setSession(data.session);
      setLoading(false);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!_event || !nextSession) {
          router.replace("/login");
          setSession(null);
          setLoading(false);
          return;
        }

        setSession(nextSession);
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar session={session} />

      <SidebarInset className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-20">
          <Navbar session={session} showSidebarTrigger />
        </div>

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-gray-500 transition-colors hover:text-orange-600"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {pathname
                  .split("/")
                  .filter((segment) => segment && segment !== "dashboard")
                  .map((segment, index, array) => {
                    const href = `/dashboard/${array
                      .slice(0, index + 1)
                      .join("/")}`;
                    const isLast = index === array.length - 1;
                    const labelMap = {
                      artikel: "Artikel",
                      berita: "Berita",
                      faq: "FAQ",
                      galeri: "Galeri",
                      kontak: "Kontak",
                      lokasi: "Lokasi",
                      profil: "Profil",
                      program: "Program",
                      testimoni: "Testimoni",
                      users: "Manajemen Pengguna",
                      tambah: "Tambah Baru",
                    };
                    const label =
                      labelMap[segment] ||
                      segment.charAt(0).toUpperCase() +
                        segment.slice(1).replace(/-/g, " ");

                    return (
                      <React.Fragment key={href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage className="font-bold text-gray-900">
                              {label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={href}
                              className="text-[10px] font-bold uppercase tracking-wider text-gray-500 transition-colors hover:text-orange-600"
                            >
                              {label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
