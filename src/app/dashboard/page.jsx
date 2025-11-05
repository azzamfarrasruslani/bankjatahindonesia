"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Globe, Settings } from "lucide-react";

export default function DashboardPage() {
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [activeNow, setActiveNow] = useState(0);

  const [realtimeUsers, setRealtimeUsers] = useState([]); // Array per menit
  const [events, setEvents] = useState([]); // Event utama
  const [pages, setPages] = useState([]); // Judul halaman

  useEffect(() => {
    const fetchGA = async () => {
      try {
        const res = await fetch("/api/ga-dashboard");
        const data = await res.json();

        const historicalRows = data?.historical?.rows || [];
        const total = historicalRows.reduce(
          (sum, row) => sum + parseInt(row?.metricValues?.[0]?.value || 0),
          0
        );
        setTotalVisits(total);

        const todayString = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const todayRow = historicalRows.find(
          (row) => row.dimensionValues?.[0]?.value === todayString
        );
        setTodayVisits(todayRow ? parseInt(todayRow?.metricValues?.[0]?.value || 0) : 0);

        setActiveNow(data?.realtime?.activeUsers || 0);
        setRealtimeUsers(data?.realtime?.perMinute || []);
        setEvents(data?.events || []);
        setPages(data?.pages || []);
      } catch (err) {
        console.error("GA fetch failed:", err);
      }
    };
    fetchGA();
  }, []);

  const stats = [
    { label: "Total Kunjungan", value: totalVisits, icon: BarChart3, color: "text-white", bg: "bg-gradient-to-br from-[#FB6B00]/90 to-orange-500" },
    { label: "Kunjungan Hari Ini", value: todayVisits, icon: Users, color: "text-gray-900", bg: "bg-white border border-gray-200" },
    { label: "Pengguna Aktif Saat Ini", value: activeNow, icon: Users, color: "text-green-600", bg: "bg-white border border-gray-200" },
    { label: "Halaman Dikelola", value: 9, icon: Globe, color: "text-gray-900", bg: "bg-white border border-gray-200" },
    { label: "Status Sistem", value: "Aktif", icon: Settings, color: "text-green-600", bg: "bg-white border border-gray-200" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-[#FB6B00]">Selamat Datang!</h1>
          <span className="text-sm text-gray-500 mt-2 sm:mt-0">Dashboard Pengelolaan Kunjungan Web</span>
        </div>

        {/* Statistik Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-gray-700 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bg} rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-transform transform hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${stat.bg.includes("white") ? "bg-gray-100" : "bg-white/20"}`}>
                  <stat.icon size={32} className={stat.bg.includes("white") ? "text-gray-900" : "text-white"} />
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value.toLocaleString ? stat.value.toLocaleString() : stat.value}</p>
              </div>
              <p className={`mt-4 text-sm ${stat.bg.includes("white") ? "text-gray-900" : "text-white/80"}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Realtime Users Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Pengguna Aktif Per Menit</h2>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Waktu</th>
                  <th className="px-4 py-2">Pengguna Aktif</th>
                </tr>
              </thead>
              <tbody>
                {realtimeUsers.map((r, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{r.minute}</td>
                    <td className="px-4 py-2">{r.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Events Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Peristiwa Utama</h2>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Nama Peristiwa</th>
                  <th className="px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{e.name}</td>
                    <td className="px-4 py-2">{e.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pages Table */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tampilan Halaman</h2>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Judul Halaman</th>
                  <th className="px-4 py-2">Jumlah Tampilan</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">{p.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
