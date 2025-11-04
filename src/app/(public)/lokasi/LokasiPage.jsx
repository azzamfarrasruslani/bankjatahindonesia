"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import LokasiHeader from "./components/LokasiHeader";
import LokasiFilter from "./components/LokasiFilter";
import LokasiList from "./components/LokasiList";
import LokasiMap from "./components/LokasiMap";
import LokasiSkeleton from "./components/LokasiSkeleton";

// Import dinamis React Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

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

    const fetchLokasi = async () => {
      try {
        const { data, error } = await supabase
          .from("lokasi")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setLokasiData(data || []);
      } catch (err) {
        console.error("Gagal memuat data lokasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLokasi();
  }, []);

  const filteredData = useMemo(() => {
    return lokasiData.filter((lokasi) => {
      const cocokJenis = filterJenis === "semua" ? true : lokasi.jenis === filterJenis;
      const cocokNama =
        lokasi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lokasi.alamat?.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokJenis && cocokNama;
    });
  }, [lokasiData, filterJenis, searchTerm]);

  return (
    <section className="min-h-screen py-20 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <LokasiHeader />
        <LokasiFilter
          filterJenis={filterJenis}
          setFilterJenis={setFilterJenis}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading ? (
          <LokasiSkeleton /> // tampilkan skeleton ketika loading
        ) : filteredData.length === 0 ? (
          <div className="text-center py-16 text-gray-400 italic">
            Tidak ada lokasi yang cocok dengan pencarian.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LokasiList filteredData={filteredData} />
            <LokasiMap
              L={L}
              MapContainer={MapContainer}
              TileLayer={TileLayer}
              Marker={Marker}
              Popup={Popup}
              filteredData={filteredData}
            />
          </div>
        )}
      </div>
    </section>
  );
}
