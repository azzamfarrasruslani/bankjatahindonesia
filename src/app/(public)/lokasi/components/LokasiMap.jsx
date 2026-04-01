"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Activity } from "lucide-react";

export default function LokasiMap({
  L,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  filteredData,
}) {
  if (!L) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Pulsing Core */}
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 relative">
            <span className="w-8 h-8 rounded-full bg-orange-500 animate-ping absolute opacity-70" />
            <Activity className="w-6 h-6 text-orange-600 z-10" />
          </div>
          <h3 className="text-gray-900 font-bold text-lg mb-1 tracking-tight">
            Menyiapkan Pemetaan
          </h3>
          <p className="text-gray-400 text-sm font-medium">
            BJI Integrated Map Engine
          </p>
        </div>
      </div>
    );
  }

  // Custom Icon Logic - Bright Orange Modern Pin
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Standin, optionally replaced with an orange map pin URL later
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className:
      "drop-shadow-md brightness-110 contrast-125 sepia-[0.8] hue-rotate-[-30deg] saturate-200", // CSS Hack to turn blue icon to orange/amber quickly
  });

  const avgLat =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.latitude || 0), 0) /
        filteredData.length
      : 0.5071; // Default
  const avgLng =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.longitude || 0), 0) /
        filteredData.length
      : 101.4478; // Default

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Floating Header UI */}
      <div className="absolute top-6 left-6 z-[400]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/90 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-[1.2rem] p-3 pr-4 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-inner">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-sm tracking-tight leading-none">
              Peta Wilayah
            </h4>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Radar Aktif
            </p>
          </div>
        </motion.div>
      </div>

      <MapContainer
        center={[avgLat, avgLng]}
        zoom={13}
        scrollWheelZoom
        zoomControl={false} // Disable default to make it look cleaner
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Premium looking light-theme map from CartoDB Voyager
        />

        {filteredData.map((lokasi) => (
          <Marker
            key={lokasi.id}
            position={[
              parseFloat(lokasi.latitude),
              parseFloat(lokasi.longitude),
            ]}
            icon={customIcon}
          >
            <Popup className="custom-popup" closeButton={false}>
              <div className="p-1 min-w-[220px]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest uppercase text-orange-500 mb-0.5 block">
                      {lokasi.jenis || "Mitra"}
                    </span>
                    <h4 className="font-black text-gray-900 text-sm leading-tight m-0">
                      {lokasi.nama}
                    </h4>
                  </div>
                </div>

                <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4 pb-3 border-b border-gray-100">
                  {lokasi.alamat}
                </p>

                <a
                  href={`https://maps.google.com/?q=${lokasi.latitude},${lokasi.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 hover:bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  Navigasi Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Edge Gradients for depth */}
      <div className="absolute inset-0 border-[6px] border-white/50 pointer-events-none z-[400]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-[400]" />
    </div>
  );
}
