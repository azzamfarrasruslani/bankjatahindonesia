"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children, breadcrumbItems }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      (_event, session) => {
        if (!_event || !session) router.replace("/login");
        setSession(session);
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
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-shrink-0 w-64">
        <Sidebar
          session={session}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-30 md:ml-64">
          <Navbar
            session={session}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        {/* Sidebar Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <Sidebar
              session={session}
              sidebarOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div
              className="flex-1 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        {/* Konten Dashboard */}
        <main className="flex-1 overflow-y-auto p-6 mt-20"> {/* ← Tambahkan mt-20 */}
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
