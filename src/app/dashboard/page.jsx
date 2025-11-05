// src/app/dashboard/page.jsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Users, Globe, Settings } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // State user
  const [user, setUser] = useState(null);

  // State GA
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [activeNow, setActiveNow] = useState(0);

  // Ambil data user dari Supabase Auth
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // redirect jika belum login
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, [supabase, router]);

  // Ambil data GA
  useEffect(() => {
    const fetchGA = async () => {
      try {
        const res = await fetch("/api/ga-dashboard");
        const data = await res.json();

        // Historical 7 hari terakhir
        const historicalRows = data?.historical?.rows || [];
        const total = historicalRows.reduce(
          (sum, row) => sum + parseInt(row.metricValues?.[1]?.value || 0),
          0
        );
        setTotalVisits(total);

        // Kunjungan hari ini
        const todayRow = historicalRows.find(
          (row) =>
            row.dimensionValues?.[0]?.value ===
            new Date().toISOString().slice(0, 10)
        );
        setTodayVisits(
          todayRow ? parseInt(todayRow.metricValues?.[1]?.value || 0) : 0
        );

        // Realtime active users
        setActiveNow(data?.realtime?.activeUsers || 0);
      } catch (err) {
        console.error("GA fetch failed:", err);
      }
    };
    fetchGA();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-[#FB6B00]">Selamat Datang!</h1>
          <span className="text-sm text-gray-500 mt-2 sm:mt-0">
            Dashboard Pengelolaan Profil & Kunjungan Web
          </span>
        </div>

        {/* Info Pengguna */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-700 text-lg">
            Hai,{" "}
            <span className="font-semibold text-[#FB6B00]">
              {user?.email || "Pengguna"}
            </span>
          </p>
          <div className="p-4 bg-[#FB6B00]/10 rounded-lg border border-[#FB6B00]/20">
            <p className="text-gray-700">
              Kamu sedang mengakses panel{" "}
              <b>Manajemen Profil & Kunjungan Web</b> untuk sistem{" "}
              <b>Bank Jatah Indonesia</b>.
            </p>
          </div>
        </div>

        {/* Statistik Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Total Kunjungan */}
          <div className="bg-gradient-to-br from-[#FB6B00]/90 to-orange-500 text-white rounded-xl p-5 shadow-md flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart3 size={28} />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Kunjungan</p>
              <p className="text-2xl font-semibold">
                {totalVisits.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Kunjungan Hari Ini */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Kunjungan Hari Ini</p>
              <p className="text-xl font-semibold text-gray-800">
                {todayVisits.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Pengguna Aktif Saat Ini */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pengguna Aktif Saat Ini</p>
              <p className="text-xl font-semibold text-green-600">{activeNow}</p>
            </div>
          </div>

          {/* Halaman Dikelola */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Globe size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Halaman Dikelola</p>
              <p className="text-xl font-semibold text-gray-800">9</p>
            </div>
          </div>

          {/* Status Sistem */}
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
