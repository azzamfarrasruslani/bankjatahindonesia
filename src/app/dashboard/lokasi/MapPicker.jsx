"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Fix hilangnya icon default Leaflet ---
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapPicker({ value, onChange }) {
  const [showMap, setShowMap] = useState(false);
  const [coords, setCoords] = useState({
    lat: value?.lat || -0.9471,
    lng: value?.lng || 100.4172,
  });
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Jika koordinat dari parent berubah
  useEffect(() => {
    if (mapRef.current && value?.lat && value?.lng) {
      mapRef.current.setView([value.lat, value.lng]);
      setCoords({ lat: value.lat, lng: value.lng });
    }
  }, [value]);

  // Saat marker diseret
  const handleMarkerDragEnd = () => {
    const marker = markerRef.current;
    if (!marker) return;
    const newPos = marker.getLatLng();
    const newLat = parseFloat(newPos.lat.toFixed(6));
    const newLng = parseFloat(newPos.lng.toFixed(6));
    setCoords({ lat: newLat, lng: newLng });
    onChange(newLat, newLng);
  };

  // Klik di peta → pindahkan marker ke titik itu
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const newLat = parseFloat(lat.toFixed(6));
    const newLng = parseFloat(lng.toFixed(6));
    setCoords({ lat: newLat, lng: newLng });
    onChange(newLat, newLng);
  };

  const handleCancel = () => {
    setCoords(value || { lat: -0.9471, lng: 100.4172 });
    setShowMap(false);
  };

  const handleSave = () => setShowMap(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowMap(true)}
        className="px-4 py-2 bg-[#FB6B00] text-white rounded-lg hover:bg-orange-600"
      >
        Pilih di Peta
      </button>

      <p className="text-xs text-gray-600 mt-2">
        <strong>Latitude:</strong> {coords.lat.toFixed(6)} |{" "}
        <strong>Longitude:</strong> {coords.lng.toFixed(6)}
      </p>

      {showMap &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleCancel}
            />
            <div className="relative w-full max-w-3xl h-[80vh] bg-white rounded-xl shadow-xl overflow-hidden">
              <MapContainer
                center={[coords.lat, coords.lng]}
                zoom={15}
                scrollWheelZoom
                className="h-full w-full"
                whenCreated={(map) => (mapRef.current = map)}
                onClick={handleMapClick}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  draggable={true}
                  position={[coords.lat, coords.lng]}
                  eventHandlers={{
                    dragend: handleMarkerDragEnd,
                  }}
                  ref={markerRef}
                >
                  <Popup>Geser marker atau klik peta untuk ubah lokasi</Popup>
                </Marker>
              </MapContainer>

              {/* Koordinat realtime */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-md shadow text-sm z-40">
                <span className="font-medium text-gray-700">
                  Lat: {coords.lat.toFixed(6)} | Lng: {coords.lng.toFixed(6)}
                </span>
              </div>

              {/* Tombol bawah */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex justify-end gap-2 z-30">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Simpan Lokasi
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
