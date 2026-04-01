"use client";

import { useEffect, useState } from "react";
import { fetchArtikel } from "@/services/artikelService";
import ArtikelHighlight from "./ArtikelHighlight";
import ArtikelCard from "./ArtikelCard";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch } from "lucide-react";

export default function ArtikelGrid() {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtikel = async () => {
      try {
        const data = await fetchArtikel();
        setArtikelList(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadArtikel();
  }, []);

  // Filter Highlight vs Other
  const highlightArtikel = artikelList
    .filter((a) => a.is_top)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);
  const otherArtikel = artikelList.filter((a) => !highlightArtikel.includes(a));

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 relative z-20 -mt-10 lg:-mt-16">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-20"
          >
            {/* Skeleton Highlight */}
            <div>
              <div className="h-10 w-64 bg-gray-100 rounded-full animate-pulse mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[400px] bg-gray-100 rounded-[2.5rem] animate-pulse border border-gray-50 shimmer-bg"
                  />
                ))}
              </div>
            </div>

            {/* Skeleton Terkini */}
            <div>
              <div className="h-10 w-56 bg-gray-100 rounded-full animate-pulse mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col bg-white rounded-[2.5rem] p-6 lg:p-8 border border-gray-100 shadow-sm h-full"
                  >
                    <div className="bg-gray-100 rounded-[1.5rem] aspect-[4/3] w-full animate-pulse mb-6 shimmer-bg" />
                    <div className="space-y-4 flex-grow">
                      <div className="h-4 w-32 bg-orange-50 rounded-full animate-pulse" />
                      <div className="h-8 bg-gray-100 rounded-2xl w-3/4 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : artikelList.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gray-50 rounded-[3rem] p-12 max-w-2xl mx-auto border border-gray-100 shadow-inner overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-60" />
              <div className="relative z-10 w-24 h-24 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-8">
                <FileSearch className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
                Belum Ada Artikel
              </h3>
              <p className="text-gray-500 font-light">
                Katalog wawasan kami sedang dalam tahap penulisan. Silakan
                kembali nanti!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-20 lg:space-y-28"
          >
            {/* Artikel Populer (Highlight) */}
            {highlightArtikel.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight uppercase">
                    Artikel{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                      Populer
                    </span>
                  </h2>
                  <div className="h-1 bg-orange-100 flex-grow rounded-full hidden sm:block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {highlightArtikel.map((item, index) => (
                    <ArtikelHighlight
                      key={item.id}
                      id={item.id}
                      image={item.gambar_url}
                      title={item.judul}
                      date={item.created_at}
                      views={item.views}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Artikel Terkini */}
            {otherArtikel.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight uppercase">
                    Artikel{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                      Terkini
                    </span>
                  </h2>
                  <div className="h-1 bg-orange-100 flex-grow rounded-full hidden sm:block" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {otherArtikel.map((item, i) => (
                    <ArtikelCard
                      key={item.id}
                      id={item.id}
                      image={item.gambar_url}
                      title={item.judul}
                      date={item.created_at}
                      views={item.views}
                      excerpt={item.isi}
                      category={item.kategori}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
