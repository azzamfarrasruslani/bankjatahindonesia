"use client";

import { useEffect, useState } from "react";
import { Users, FileText, Newspaper, MapPin, LayoutGrid } from "lucide-react";

export default function DashboardPage() {
  const [statsData, setStatsData] = useState({
    artikel: 0,
    berita: 0,
    program: 0,
    lokasi: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard-stats");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStatsData(data);
      } catch (err) {
        console.error("Dashboard stats fetch failed:", err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Pengguna",
      value: statsData.users,
      icon: Users,
      color: "text-white",
      bg: "bg-gradient-to-br from-[#FB6B00]/90 to-orange-500",
    },
    {
      label: "Total Artikel",
      value: statsData.artikel,
      icon: FileText,
      color: "text-gray-900",
      bg: "bg-white border border-gray-200",
    },
    {
      label: "Total Berita",
      value: statsData.berita,
      icon: Newspaper,
      color: "text-green-600",
      bg: "bg-white border border-gray-200",
    },
    {
      label: "Total Program",
      value: statsData.program,
      icon: LayoutGrid,
      color: "text-gray-900",
      bg: "bg-white border border-gray-200",
    },
    {
      label: "Total Lokasi",
      value: statsData.lokasi,
      icon: MapPin,
      color: "text-blue-600",
      bg: "bg-white border border-gray-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-[#FB6B00]">Selamat Datang!</h1>
          <span className="text-sm text-gray-500 mt-2 sm:mt-0">
            Dashboard Pengelolaan Website
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-gray-700 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bg} rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-transform transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-3 rounded-full ${
                    stat.bg.includes("white") ? "bg-gray-100" : "bg-white/20"
                  }`}
                >
                  <stat.icon
                    size={32}
                    className={
                      stat.bg.includes("white") ? "text-gray-900" : "text-white"
                    }
                  />
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value.toLocaleString
                    ? stat.value.toLocaleString()
                    : stat.value}
                </p>
              </div>
              <p
                className={`mt-4 text-sm ${
                  stat.bg.includes("white") ? "text-gray-900" : "text-white/80"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
