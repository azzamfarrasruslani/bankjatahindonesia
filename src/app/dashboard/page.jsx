"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Users, Globe, Settings } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      // Ambil user
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);

      // Catat kunjungan
      await supabase.from("visits").insert({
        user_id: data.user.id,
        path: window.location.pathname,
      });

      // Ambil total kunjungan
      const { count: totalCount } = await supabase
        .from("visits")
        .select("*", { count: "exact" });

      setTotalVisits(totalCount);

      // Ambil kunjungan unik hari ini
      const today = new Date();
      today.setHours(0, 0, 0, 0); // awal hari
      const { count: todayCount } = await supabase
        .from("visits")
        .select("*", { count: "exact" })
        .gte("created_at", today.toISOString());

      setTodayVisits(todayCount);
    };

    init();
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">
          Memuat dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Selamat Datang!
          </h1>
          <span className="text-sm text-gray-500 mt-2 sm:mt-0">
            Dashboard Pengelolaan Profil & Kunjungan Web
          </span>
        </div>

        {/* Info Pengguna */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-700 text-lg">
            Hai, <span className="font-semibold text-[#FB6B00]">{user.email}</span>
          </p>
          <div className="p-4 bg-[#FB6B00]/10 rounded-lg border border-[#FB6B00]/20">
            <p className="text-gray-700">
              Kamu sedang mengakses panel <b>Manajemen Profil & Kunjungan Web</b> untuk sistem{" "}
              <b>Bank Jatah Indonesia</b>. Gunakan menu navigasi untuk mengelola
              data profil, statistik, dan aktivitas pengguna.
            </p>
          </div>
        </div>

        {/* Statistik Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#FB6B00]/90 to-orange-500 text-white rounded-xl p-5 shadow-md flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart3 size={28} />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Kunjungan</p>
              <p className="text-2xl font-semibold">{totalVisits.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Kunjungan Hari Ini</p>
              <p className="text-xl font-semibold text-gray-800">{todayVisits.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Globe size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Halaman Dikelola</p>
              <p className="text-xl font-semibold text-gray-800">9</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Settings size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Status Sistem</p>
              <p className="text-xl font-semibold text-green-600">Aktif</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
