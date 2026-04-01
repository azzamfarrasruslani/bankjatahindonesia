"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";

// Helper to convert standard youtube urls to embed form
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
}

export default function LokasiList({ filteredData }) {
  return (
    <div className="flex flex-col gap-6 pr-2 lg:pr-4 h-full lg:h-[630px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent hover:scrollbar-thumb-orange-400 pb-8">
      {filteredData.map((lokasi, i) => (
        <motion.div
          key={lokasi.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative bg-white rounded-[1.5rem] shadow-sm hover:shadow-[0_15px_30px_rgba(249,115,22,0.1)] border border-gray-100 transition-all duration-300 p-5 lg:p-6 overflow-hidden flex flex-col gap-5"
        >
          {/* Subtle Orange Glow Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Top Row: Thumbnail & Texts */}
          <div className="flex flex-col sm:flex-row gap-5 relative z-10">
            {/* Image Thumbnail */}
            <div className="w-full sm:w-[130px] shrink-0">
              <div className="relative w-full aspect-video sm:aspect-square sm:h-[130px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                {lokasi.gambar_url ? (
                  <>
                    <Image
                      src={lokasi.gambar_url}
                      alt={lokasi.nama}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 130px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 group-hover:text-orange-300 transition-colors">
                    <MapPin className="w-8 h-8 mb-1 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Lokasi
                    </span>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md 
                       ${lokasi.jenis === "utama" ? "bg-orange-500/95 text-white" : "bg-white/95 text-gray-700"}`}
                  >
                    {lokasi.jenis || "Mitra"}
                  </span>
                </div>
              </div>
            </div>

            {/* Texts & Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg lg:text-xl font-black text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                  {lokasi.nama}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium line-clamp-2 mb-3">
                  {lokasi.alamat || "Alamat lengkap tidak tersedia."}
                </p>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>
                    {lokasi.jam_operasional || "Senin - Jumat, 08:00 - 17:00"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>{lokasi.kontak || "Belum ada kontak terdaftar"}</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`https://maps.google.com/?q=${lokasi.latitude},${lokasi.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-orange-500 text-white border border-transparent text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-xl transition-all duration-300 group/btn mt-auto self-start sm:w-auto w-full shadow-md"
              >
                <MapPin className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                <span>Arahan Navigasi</span>
              </a>
            </div>
          </div>

          {/* Bottom Row: Media Documentation (Conditionally Rendered) */}
          {(lokasi.gambar_kegiatan || lokasi.link_video_youtube) && (
            <div className="relative z-10 pt-4 mt-2 border-t border-gray-100 transition-colors duration-300 group-hover:border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 opacity-70">
                  Dokumentasi & Kegiatan
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Gambar Kegiatan */}
                {lokasi.gambar_kegiatan && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 group/kegiatan bg-gray-50">
                    <Image
                      src={lokasi.gambar_kegiatan}
                      alt="Kegiatan Lokasi"
                      fill
                      className="object-cover transition-transform duration-700 group-hover/kegiatan:scale-110"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gray-900/30 opacity-0 group-hover/kegiatan:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <ImageIcon className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                )}

                {/* YouTube Video iframe */}
                {lokasi.link_video_youtube && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-900 shadow-inner group/video">
                    <iframe
                      src={getYouTubeEmbedUrl(lokasi.link_video_youtube)}
                      className="absolute inset-0 w-full h-full opacity-90 group-hover/video:opacity-100 transition-opacity"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
