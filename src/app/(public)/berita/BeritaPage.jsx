"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import BeritaHeading from "./components/BeritaHeading";
import BeritaTopCard from "./components/BeritaTopCard";
import BeritaCard from "./components/BeritaCard";
import { motion, AnimatePresence } from "framer-motion";
import { FileQuestion } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBeritaList(data || []);
      } catch (err) {
        console.error("Gagal memuat data berita:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  // Set Berita Unggulan vs Lainnya
  const topNews = beritaList.find((b) => b.is_top) || beritaList[0];
  const otherNews = topNews
    ? beritaList.filter((b) => b.id !== topNews.id)
    : [];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header Section */}
      <BeritaHeading />

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Top Card Skeleton */}
              <div className="w-full h-[500px] bg-gray-100 rounded-[2.5rem] animate-pulse border border-gray-50 shimmer-bg" />

              {/* Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm h-full"
                  >
                    <div className="bg-gray-100 rounded-[1.2rem] h-48 w-full animate-pulse mb-6 shimmer-bg" />
                    <div className="space-y-3 flex-grow">
                      <div className="h-4 w-24 bg-orange-50 rounded-full animate-pulse" />
                      <div className="h-6 bg-gray-100 rounded-xl w-full animate-pulse" />
                      <div className="h-6 bg-gray-100 rounded-xl w-3/4 animate-pulse" />
                      <div className="space-y-2 pt-2">
                        <div className="h-3 bg-gray-50 rounded-full w-full animate-pulse" />
                        <div className="h-3 bg-gray-50 rounded-full w-5/6 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : beritaList.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Berita Unggulan */}
              {topNews && <BeritaTopCard berita={topNews} />}

              {/* Grid Berita Lainnya */}
              {otherNews.length > 0 && (
                <div className="mt-16 sm:mt-24">
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight uppercase">
                      Berita{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                        Lainnya
                      </span>
                    </h2>
                    <div className="h-1 bg-orange-100 flex-grow rounded-full hidden sm:block" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {otherNews.map((item, i) => (
                      <BeritaCard key={item.id} berita={item} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 sm:py-32"
            >
              <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-20 max-w-2xl mx-auto border border-gray-100 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-60" />
                <div className="relative z-10 w-24 h-24 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full flex items-center justify-center mx-auto mb-8">
                  <FileQuestion className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 tracking-tight">
                  Katalog Berita Kosong
                </h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed">
                  Saat ini belum ada publikasi berita atau artikel terbaru yang
                  dirilis. Silakan kembali lagi nanti untuk membaca informasi
                  ter-update kami.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
