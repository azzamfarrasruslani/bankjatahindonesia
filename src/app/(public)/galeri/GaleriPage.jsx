"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/common/HeroSection";
import { Search, ZoomIn, Calendar, Tag, X, Image as ImageIcon } from "lucide-react";

export default function GaleriPage() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [kategoriList, setKategoriList] = useState(["Semua"]);

  // Ambil data dari Supabase
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const { data, error } = await supabase
          .from("galeri")
          .select("id, judul, deskripsi, url_gambar, kategori, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setGaleri(data || []);

        // Ekstrak kategori unik
        if (data && data.length > 0) {
          const uniqueCategories = [
            "Semua",
            ...new Set(data.map((item) => item.kategori).filter(Boolean)),
          ];
          setKategoriList(uniqueCategories);
        }
      } catch (err) {
        console.error("Gagal mengambil data galeri:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  const filteredGaleri =
    filterKategori === "Semua"
      ? galeri
      : galeri.filter((item) => item.kategori === filterKategori);

  // Helper untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Cinematic Hero */}
      <HeroSection
        title="Galeri BJI"
        description="Jelajahi berbagai momen dan kegiatan Bank Jatah Indonesia dalam upaya memasyarakatkan pengelolaan minyak jelantah demi lingkungan yang lebih bersih."
        imageUrl="/images/galeri-banner.jpeg"
      />

      {/* Main Content Area */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-16">
        {/* Panel Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-4 mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4"
        >
          {kategoriList.map((kat, idx) => (
            <button
              key={idx}
              onClick={() => setFilterKategori(kat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                filterKategori === kat
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {kat}
            </button>
          ))}
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 animate-pulse break-inside-avoid"
              >
                <div
                  className={`bg-gray-200 w-full rounded-[1.2rem] mb-4 ${i % 2 === 0 ? "h-64" : "h-80"}`}
                ></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2 ml-1"></div>
                <div className="h-3 bg-gray-100 rounded-md w-1/2 ml-1"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredGaleri.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[3rem] border border-gray-100 text-center px-4">
            <div className="w-24 h-24 mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Belum Ada Foto
            </h3>
            <p className="text-gray-500 font-medium">
              Dokumentasi untuk kategori ini belum tersedia.
            </p>
          </div>
        )}

        {/* Masonry Grid (CSS Columns) */}
        {!loading && filteredGaleri.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
            {filteredGaleri.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelectedImage(item)}
                className="group relative cursor-pointer break-inside-avoid bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-[0_15px_40px_rgba(249,115,22,0.15)] border border-gray-100 hover:border-orange-200 transition-all duration-500"
              >
                {/* Image Card */}
                <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-gray-100 mb-3">
                  {/* Provide an approximate aspect ratio or let it wrap naturally (masonry effect works best with just unconstrained height, but next/image fill requires it. We'll use a hack to make it pseudo-masonry with Next Image)
                      Since we don't know the exact dimensions of images from DB, we give them a fluid wrapper or use set heights. We'll use object-cover with some varied heights for masonry feel.
                  */}
                  <div
                    className={`relative w-full ${i % 3 === 0 ? "aspect-square" : i % 2 === 0 ? "aspect-[4/5]" : "aspect-video"}`}
                  >
                    <Image
                      src={item.url_gambar}
                      alt={item.judul || "Galeri"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Hover Overlay Vignette & Icon */}
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white shadow-lg">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details under image */}
                <div className="px-2 pb-2">
                  <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                    {item.judul || "Dokumentasi BJI"}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {item.kategori && (
                      <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                        <Tag className="w-3 h-3 text-orange-400" />
                        {item.kategori}
                      </span>
                    )}
                    {item.created_at && (
                      <span className="flex items-center gap-1.5 opacity-80">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {formatDate(item.created_at)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Modern Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-gray-950/90 backdrop-blur-xl flex items-center justify-center z-[100] px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button Float */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-300 z-[110] hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center bg-gray-900 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
            >
              <div className="w-full relative min-h-[40vh] max-h-[70vh] flex items-center justify-center bg-gray-950">
                <img
                  src={selectedImage.url_gambar}
                  alt={selectedImage.judul}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="w-full p-6 sm:p-8 bg-gray-900 relative">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">
                    {selectedImage.kategori || "Galeri"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="text-gray-400 text-xs">
                    {formatDate(selectedImage.created_at)}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                  {selectedImage.judul || "Dokumentasi BJI"}
                </h3>
                {selectedImage.deskripsi && (
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
                    {selectedImage.deskripsi}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
