"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function LokasiList({ filteredData }) {
  return (
    <div className="h-[550px] overflow-y-auto pr-3 space-y-4 scrollbar-thin scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 scrollbar-track-gray-100/50">
      {filteredData.map((lokasi, i) => (
        <motion.div
          key={lokasi.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 p-6 overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-6">
            {/* Content */}
            <div className="flex-1 space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {lokasi.nama}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {lokasi.alamat || "Alamat tidak tersedia"}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    <strong>Jam Operasional:</strong> {lokasi.jam_operasional || "Tidak tersedia"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>
                    <strong>Kontak:</strong> {lokasi.kontak || "Tidak tersedia"}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href={`https://maps.google.com/?q=${lokasi.latitude},${lokasi.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 group/btn"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka di Maps</span>
                <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </motion.a>
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
              {lokasi.gambar_url ? (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden group/image">
                  <Image
                    src={lokasi.gambar_url}
                    alt={lokasi.nama}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                    sizes="128px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 text-gray-400 group/nogambar">
                  <ImageIcon className="w-8 h-8 mb-2 transition-transform duration-300 group-hover/nogambar:scale-110" />
                  <span className="text-xs text-center px-2">Tidak ada gambar</span>
                </div>
              )}
            </div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-300" />
        </motion.div>
      ))}
    </div>
  );
}