"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function LokasiMap({ L, MapContainer, TileLayer, Marker, Popup, filteredData }) {
  if (!L) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[550px] bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 text-primary"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="font-semibold text-lg">Memuat Peta...</p>
        <p className="text-sm text-primary/70 mt-2">Sedang memuat data lokasi</p>
      </motion.div>
    );
  }

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: "map-marker-icon"
  });

  const avgLat =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.latitude || 0), 0) / filteredData.length
      : 0.5071; // Default Pekanbaru latitude
  const avgLng =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.longitude || 0), 0) / filteredData.length
      : 101.4478; // Default Pekanbaru longitude

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[550px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 group"
    >
      {/* Header Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/20">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-gray-900">Peta Lokasi</span>
          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
            {filteredData.length} Lokasi
          </span>
        </div>
      </div>

      <MapContainer 
        center={[avgLat, avgLng]} 
        zoom={12} 
        scrollWheelZoom 
        className="w-full h-full rounded-2xl"
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
            <Popup className="custom-popup">
              <div className="min-w-[200px] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900 text-sm">{lokasi.nama}</h4>
                </div>
                
                <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                  {lokasi.alamat}
                </p>
                
                <div className="space-y-1 text-xs text-gray-500">
                  {lokasi.jam_operasional && (
                    <p><strong>Jam:</strong> {lokasi.jam_operasional}</p>
                  )}
                  {lokasi.kontak && (
                    <p><strong>Kontak:</strong> {lokasi.kontak}</p>
                  )}
                </div>
                
                <a
                  href={`https://maps.google.com/?q=${lokasi.latitude},${lokasi.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary-dark text-xs font-medium mt-3 transition-colors"
                >
                  Buka di Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
    </motion.div>
  );
}