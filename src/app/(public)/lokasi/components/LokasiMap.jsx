import { motion } from "framer-motion";

export default function LokasiMap({ L, MapContainer, TileLayer, Marker, Popup, filteredData }) {
  if (!L) {
    return (
      <div className="flex justify-center items-center h-[550px] bg-orange-50 text-[#FB6B00] font-semibold animate-pulse rounded-3xl">
        Memuat peta...
      </div>
    );
  }

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });

  const avgLat =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.latitude || 0), 0) / filteredData.length
      : -6.2;
  const avgLng =
    filteredData.length > 0
      ? filteredData.reduce((sum, l) => sum + parseFloat(l.longitude || 0), 0) / filteredData.length
      : 106.8;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full h-[550px] rounded-3xl shadow-xl overflow-hidden border-4 border-white"
    >
      <MapContainer center={[avgLat, avgLng]} zoom={11} scrollWheelZoom className="w-full h-full">
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
  );
}
