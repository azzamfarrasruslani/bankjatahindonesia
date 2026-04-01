"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icon default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);

function MapEvents({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ value, onChange }) {
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const lat = parseFloat(value?.lat) || -0.9471;
  const lng = parseFloat(value?.lng) || 100.4172;

  // Sinkronisasi view peta saat koordinat berubah dari input manual
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], mapRef.current.getZoom());
    }
  }, [lat, lng]);

  const handleMarkerDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const pos = marker.getLatLng();
      onChange(parseFloat(pos.lat.toFixed(6)), parseFloat(pos.lng.toFixed(6)));
    }
  };

  return (
    <div className="w-full h-[350px] rounded-[2rem] overflow-hidden border-2 border-white shadow-lg ring-1 ring-gray-100 relative group">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onClick={onChange} />
        <Marker
          draggable={true}
          position={[lat, lng]}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
          ref={markerRef}
        />
      </MapContainer>

      {/* Overlay info koordinat yang lebih cantik */}
      <div className="absolute bottom-4 left-4 right-4 z-[400] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center justify-between pointer-events-auto">
          <div className="flex gap-4">
            <div className="space-y-0.5">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-left">Latitude</p>
              <p className="text-xs font-bold text-gray-900">{lat.toFixed(6)}</p>
            </div>
            <div className="space-y-0.5 border-l border-gray-100 pl-4">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-left">Longitude</p>
              <p className="text-xs font-bold text-gray-900">{lng.toFixed(6)}</p>
            </div>
          </div>
          <p className="text-[9px] font-bold text-[#FB6B00] bg-orange-50 px-2 py-1 rounded-lg uppercase tracking-wider">
            Klik / Geser Marker
          </p>
        </div>
      </div>
    </div>
  );
}
