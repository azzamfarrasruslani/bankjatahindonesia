"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Users, Globe, Settings } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [visitCount, setVisitCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };
    getUser();

    // Simulasi data kunjungan, nanti bisa diambil dari tabel Supabase
    const fetchVisitData = async () => {
      const totalVisits = Math.floor(Math.random() * 5000) + 1200; // dummy data
      setVisitCount(totalVisits);
    };
    fetchVisitData();
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 ">
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
              <p className="text-2xl font-semibold">{visitCount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pengunjung Aktif</p>
              <p className="text-xl font-semibold text-gray-800">
                {Math.floor(visitCount * 0.12)}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition">
            <div className="p-3 bg-[#FB6B00]/10 text-[#FB6B00] rounded-full">
              <Globe size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Halaman Dikelola</p>
              <p className="text-xl font-semibold text-gray-800">8</p>
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

        {/* Bagian Aktivitas dan Status */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Aktivitas Terbaru
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Belum ada aktivitas baru saat ini.
            </p>
            <button className="px-4 py-2 bg-[#FB6B00] text-white text-sm rounded-lg hover:bg-[#e25f00] transition">
              Lihat Detail Aktivitas
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Status Akun
            </h2>
            <p className="text-sm text-gray-500">
              Akun aktif dan terautentikasi dengan email:
            </p>
            <p className="text-sm text-[#FB6B00] font-medium mt-1">
              {user.email}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-[#FB6B00]/10 border border-[#FB6B00]/40 text-[#FB6B00] text-sm rounded-lg hover:bg-[#FB6B00]/20 transition"
              onClick={() => router.push("/profile")}
            >
              Kelola Profil Web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
