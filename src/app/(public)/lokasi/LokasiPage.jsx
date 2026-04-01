"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { fetchLokasi } from "@/lib/services/lokasiService";
import LokasiFilter from "./components/LokasiFilter";
import LokasiList from "./components/LokasiList";
import LokasiMap from "./components/LokasiMap";
import LokasiSkeleton from "./components/LokasiSkeleton";
import HeroSection from "@/components/common/HeroSection";
import { motion, AnimatePresence } from "framer-motion";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

export default function LokasiPage() {
  const [lokasiData, setLokasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [L, setLeaflet] = useState(null);
  const [filterJenis, setFilterJenis] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => setLeaflet(leaflet));
      import("leaflet/dist/leaflet.css");
    }

    const loadLokasi = async () => {
      try {
        const data = await fetchLokasi();
        setLokasiData(data || []);
      } catch (err) {
        console.error("Gagal memuat data lokasi:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLokasi();
  }, []);

  const filteredData = useMemo(() => {
    return lokasiData.filter((lokasi) => {
      const cocokJenis =
        filterJenis === "semua" ? true : lokasi.jenis === filterJenis;
      const cocokNama =
        lokasi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lokasi.alamat?.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokJenis && cocokNama;
    });
  }, [lokasiData, filterJenis, searchTerm]);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Cinematic Hero */}
      <HeroSection
        title="Jaringan Lokasi"
        description="Temukan titik penjemputan utama dan kantor mitra Bank Jatah Indonesia di berbagai lokasi strategis untuk mempermudah partisipasi Anda."
        imageUrl="/images/lokasi-banner.jpeg"
      />

      <section className="relative mt-8 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          {/* Interaktif Filter Overlaying Hero */}
          <LokasiFilter
            filterJenis={filterJenis}
            setFilterJenis={setFilterJenis}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Main Content List & Map */}
          <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 mt-6 min-h-[600px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LokasiSkeleton />
                </motion.div>
              ) : filteredData.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-24 h-24 mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Lokasi Tidak Ditemukan
                  </h3>
                  <p className="text-gray-500">
                    Coba ubah kata kunci atau ganti filter kategori.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12"
                >
                  {/* Scrollable List Area (Left) */}
                  <div className="w-full lg:w-[45%] xl:w-[40%] flex-shrink-0">
                    <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                        Daftar Titik
                      </h2>
                      <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {filteredData.length} Ditemukan
                      </span>
                    </div>
                    <LokasiList filteredData={filteredData} />
                  </div>

                  {/* Map Area (Right) */}
                  <div className="w-full lg:w-[55%] xl:w-[60%] h-[400px] lg:h-[700px] rounded-[2rem] overflow-hidden sticky top-8 border-4 border-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] group">
                    <LokasiMap
                      L={L}
                      MapContainer={MapContainer}
                      TileLayer={TileLayer}
                      Marker={Marker}
                      Popup={Popup}
                      filteredData={filteredData}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
