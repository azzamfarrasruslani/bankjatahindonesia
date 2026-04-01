"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ArtikelSection() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("artikel")
        .select("id, judul, gambar_url, created_at, kategori")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;

      if (data) {
        const articles = data.map((item) => ({
          id: item.id,
          title: item.judul,
          date: new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          category: item.kategori || "Umum",
          image: item.gambar_url || "/images/tentang-kami.png",
          href: `/artikel/${item.id}`,
        }));
        setNewsArticles(articles);
      }
    } catch (err) {
      console.error("Error fetching articles:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-orange-50 rounded-full w-48 mb-6"></div>
              <div className="h-12 bg-gray-100 rounded-full w-96 mb-6"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="lg:col-span-2 h-[400px] bg-gray-50 animate-pulse rounded-[2rem]"></div>
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-50 animate-pulse rounded-2xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (newsArticles.length === 0) {
    return (
      <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-orange-200 bg-orange-50 rounded-full mb-6 mx-auto shadow-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
                Artikel Terkini
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
              Wawasan & <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Inspirasi
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 rounded-[2.5rem] p-16 max-w-lg mx-auto border border-gray-100 shadow-sm border-dashed">
              <div className="w-24 h-24 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-orange-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Belum Ada Artikel
              </h3>
              <p className="text-gray-500 font-light">
                Berita dan informasi terbaru akan segera tersedia.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6 relative overflow-hidden border-t border-gray-50">
      {/* Background Decoratives - Minimalist Grid */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#f97316 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Modern SaaS Centered */}
        <div className="text-center mb-16 lg:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-200 bg-orange-50 rounded-full shadow-sm mx-auto"
          >
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-orange-600 tracking-[0.2em] uppercase">Update & Wawasan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-black leading-tight uppercase tracking-tighter"
          >
            Artikel & <span className="text-orange-500">Berita</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Temukan inspirasi dan informasi terbaru seputar upaya menjaga kelestarian lingkungan dan ekonomi sirkular Indonesia.
          </motion.p>
        </div>

        {/* Articles Grid - Balanced SaaS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Featured Article Panel (Lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group"
          >
            <Link href={newsArticles[0].href} className="block h-full">
              <div className="relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-[0_30px_70px_rgba(249,115,22,0.12)] border border-gray-50 hover:border-orange-100 transition-all duration-700 overflow-hidden h-full flex flex-col">
                
                {/* Image Section - Zoom & Overlay */}
                <div className="relative h-64 md:h-[26rem] overflow-hidden bg-gray-100">
                  <Image
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                  
                  {/* Category Pill Floating */}
                  <div className="absolute top-8 left-8">
                    <span className="bg-orange-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg">
                      {newsArticles[0].category}
                    </span>
                  </div>
                </div>

                {/* Content Section - High Contrast */}
                <div className="p-10 flex flex-col flex-grow justify-between relative">
                  <div>
                    <div className="flex items-center gap-4 text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">{newsArticles[0].date}</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">Berita Utama</span>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-black text-black mb-6 leading-[1.1] group-hover:text-orange-600 transition-colors tracking-tighter">
                      {newsArticles[0].title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em] pt-6 border-t border-gray-50 group-hover:gap-6 transition-all duration-500">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles List (Lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-6 flex-grow">
              {newsArticles.slice(1, 4).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={article.href} className="block">
                    <div className="flex gap-5 bg-white rounded-3xl p-5 border border-gray-50 shadow-sm hover:shadow-[0_15px_40px_rgba(249,115,22,0.08)] hover:border-orange-100 transition-all duration-500 items-center">
                      {/* Thumbnail Small */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>

                      {/* Content Small */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md">
                            {article.category}
                          </span>
                          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                            {article.date}
                          </span>
                        </div>
                        <h4 className="font-black text-black text-sm md:text-lg leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors tracking-tight">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-orange-500/40 group-hover:text-orange-500 font-black text-[10px] uppercase tracking-widest transition-all">
                          <span>Baca</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All CTA - Large Modern Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-2"
            >
              <Link href="/artikel">
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white font-black py-6 px-10 rounded-[2rem] transition-all duration-500 shadow-xl hover:shadow-orange-500/20 group flex items-center justify-between"
                >
                  <span className="uppercase tracking-[0.2em] text-[10px]">Lihat Semua Artikel Kami</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
