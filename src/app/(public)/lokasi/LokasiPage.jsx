"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

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

  // Fetch data & inisialisasi Leaflet
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

  // Filter dan pencarian
  const filteredData = useMemo(() => {
    return lokasiData.filter((lokasi) => {
      const cocokJenis = filterJenis === "semua" ? true : lokasi.jenis === filterJenis;
      const cocokNama =
        lokasi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lokasi.alamat?.toLowerCase().includes(searchTerm.toLowerCase());
      return cocokJenis && cocokNama;
    });
  }, [lokasiData, filterJenis, searchTerm]);

  // Jika Leaflet belum dimuat
  if (!L) {
    return (
      <section className="flex justify-center items-center h-screen text-[#FB6B00] font-semibold animate-pulse">
        Memuat peta...
      </section>
    );
  }

  // Custom icon marker
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });

  // Rata-rata koordinat untuk center map
  const avgLat =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.latitude || 0), 0) / filteredData.length
      : -6.2;
  const avgLng =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.longitude || 0), 0) / filteredData.length
      : 106.8;

  return (
    <section className="min-h-screen py-20 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <div className="max-w-7xl mt-23 mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
            <span className="bg-gradient-to-r from-[#FB6B00] to-orange-600 bg-clip-text text-transparent">
              Jaringan Lokasi Kami
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Temukan lokasi utama dan mitra kami di berbagai titik di Kota Pekanbaru. Kami melayani
            pengelolaan minyak jelantah secara efisien dan ramah lingkungan.
          </p>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Filter Jenis:</label>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="border border-orange-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="semua">Semua</option>
              <option value="utama">Lokasi Utama</option>
              <option value="mitra">Mitra</option>
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-orange-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* STATUS */}
        {loading ? (
          <div className="text-center text-[#FB6B00] font-semibold py-20 animate-pulse">
            Memuat data lokasi...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-16 text-gray-400 italic">
            Tidak ada lokasi yang cocok dengan pencarian.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LIST LOKASI */}
            <div className="h-[550px] overflow-y-auto pr-3 space-y-6 scrollbar-thin scrollbar-thumb-orange-300 hover:scrollbar-thumb-orange-400 scrollbar-track-orange-100">
              {filteredData.map((lokasi, i) => (
                <motion.div
                  key={lokasi.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-orange-100 transition duration-300 p-5 flex flex-col sm:flex-row gap-5"
                >
                  {/* TEKS */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <MapPin className="w-6 h-6 text-[#FB6B00] mr-3" />
                        <h2 className="text-lg font-bold text-gray-900">{lokasi.nama}</h2>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{lokasi.alamat || "-"}</p>
                      <p className="text-xs text-gray-500 mb-1">
                        Jam operasional:{" "}
                        <span className="font-medium">
                          {lokasi.jam_operasional || "Tidak tersedia"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Kontak:{" "}
                        <span className="font-medium">{lokasi.kontak || "Tidak tersedia"}</span>
                      </p>
                    </div>

                    <motion.a
                      href={`https://maps.google.com/?q=${lokasi.latitude},${lokasi.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center bg-[#FB6B00] text-white text-sm font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#e76a00] transition self-start"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Lihat di Google Maps
                    </motion.a>
                  </div>

                  {/* GAMBAR */}
                  {lokasi.gambar_url ? (
                    <div className="flex-shrink-0">
                      <img
                        src={lokasi.gambar_url}
                        alt={lokasi.nama}
                        className="w-40 h-40 object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center bg-orange-50 rounded-xl text-gray-400 text-xs">
                      Tidak ada gambar
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* MAP */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full h-[550px] rounded-3xl shadow-xl overflow-hidden border-4 border-white"
            >
              <MapContainer
                center={[avgLat, avgLng]}
                zoom={11}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredData.map((lokasi) => (
                  <Marker
                    key={lokasi.id}
                    position={[parseFloat(lokasi.latitude), parseFloat(lokasi.longitude)]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className="text-sm font-medium">
                        {lokasi.nama}
                        <br />
                        <span className="text-gray-500 text-xs">{lokasi.alamat}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
