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
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-gray-50">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/80 via-transparent to-transparent opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-orange-200 bg-orange-50 rounded-full mb-6 mx-auto shadow-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              Artikel Terkini
            </span>
          </div>

          {/* Title - Light Theme High Contrast */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            Wawasan & <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Inspirasi
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Eksplorasi langkah kecil berdampak besar. Dapatkan informasi terbaru
            terkait lingkungan dan transisi energi terbarukan.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Featured Article (Left Side Large Panel) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 group"
          >
            <Link href={newsArticles[0].href} className="block h-full">
              <div className="relative bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col hover:border-orange-200">
                {/* Image Section */}
                <div className="relative h-72 lg:h-[22rem] overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    onError={(e) => {
                      e.target.src = "/images/default-article.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-90" />

                  {/* Badges Floating inside image */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
                      {newsArticles[0].category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-10 flex flex-col flex-grow justify-between bg-white group-hover:bg-orange-50/10 transition-colors duration-500">
                  <div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                      <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs">{newsArticles[0].date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs">Berita Utama</span>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors line-clamp-3">
                      {newsArticles[0].title}
                    </h3>
                  </div>

                  {/* Read More Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-wide">
                      <span>BACA SELENGKAPNYA</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 transform group-hover:-rotate-45">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles (Right Side Panel) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {newsArticles.slice(1).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group flex-1"
              >
                <Link href={article.href} className="block h-full">
                  <div className="flex flex-col sm:flex-row gap-5 bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] border border-gray-100 hover:border-orange-200 transition-all duration-300 h-full">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-36 h-48 sm:h-full min-h-[120px] rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 150px"
                        onError={(e) => {
                          e.target.src = "/images/default-article.jpg";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center py-1 sm:pr-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-300" />{" "}
                          {article.date}
                        </span>
                      </div>

                      <h4 className="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {article.title}
                      </h4>

                      <div className="mt-auto flex items-center gap-1.5 text-gray-400 font-semibold text-xs group-hover:text-orange-500 transition-colors uppercase tracking-wider">
                        <span>Baca</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* View All Button Premium Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-2 h-full flex-grow flex"
            >
              <Link href="/artikel" className="w-full h-full flex">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full h-full min-h-[60px] flex items-center justify-center gap-3 bg-gray-50 hover:bg-orange-500 text-gray-600 hover:text-white font-bold py-4 px-6 rounded-3xl border border-gray-100 hover:border-orange-400 transition-all duration-300 group shadow-sm hover:shadow-[0_8px_25px_rgba(249,115,22,0.3)]"
                >
                  <span className="uppercase tracking-widest text-sm">
                    Lihat Semua Artikel
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
