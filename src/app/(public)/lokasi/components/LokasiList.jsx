import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function LokasiList({ filteredData }) {
  return (
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
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-3">
                <MapPin className="w-6 h-6 text-[#FB6B00] mr-3" />
                <h2 className="text-lg font-bold text-gray-900">{lokasi.nama}</h2>
              </div>
              <p className="text-gray-700 text-sm mb-2">{lokasi.alamat || "-"}</p>
              <p className="text-xs text-gray-500 mb-1">
                Jam operasional:{" "}
                <span className="font-medium">{lokasi.jam_operasional || "Tidak tersedia"}</span>
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Kontak: <span className="font-medium">{lokasi.kontak || "Tidak tersedia"}</span>
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
  );
}
