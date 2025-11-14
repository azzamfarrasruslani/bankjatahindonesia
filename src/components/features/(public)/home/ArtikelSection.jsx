"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ArtikelSection() {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("artikel")
      .select("id, judul, gambar_url, created_at, kategori")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      // Mapping data sesuai dengan struktur UI
      const articles = data.map((item) => ({
        id: item.id,
        title: item.judul,
        date: new Date(item.created_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        category: item.kategori || "Umum",
        image: item.gambar_url || "/images/tentang-kami.png",
        href: `/artikel/${item.id}`, // link ke detail artikel
      }));

      setNewsArticles(articles);
    }
  };

  if (newsArticles.length === 0) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Artikel Terkini
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Wawasan &{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Inspirasi
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto border border-gray-200 shadow-sm">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Artikel
              </h3>
              <p className="text-gray-600">Artikel akan segera tersedia.</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Artikel Terkini
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Wawasan &{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
              Inspirasi
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Temukan berbagai artikel menarik seputar lingkungan, pengelolaan
            minyak jelantah, dan gaya hidup berkelanjutan untuk masa depan yang
            lebih baik.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Featured Article (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 group"
          >
            <Link href={newsArticles[0].href}>
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
                {/* Image */}
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={(e) => {
                      e.target.src = "/images/default-article.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {newsArticles[0].category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{newsArticles[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">5 min read</span>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {newsArticles[0].title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {newsArticles[0].description}
                  </p>

                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-500" />
              </div>
            </Link>
          </motion.div>

          {/* Side Articles */}
          <div className="lg:col-span-2 space-y-4">
            {newsArticles.slice(1).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={article.href}>
                  <div className="flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 group-hover:scale-[1.01] h-full">
                    {/* Image */}
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 1024px) 20vw, 10vw"
                        onError={(e) => {
                          e.target.src = "/images/default-article.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {article.date}
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>

                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-1 mb-1">
                        {article.description}
                      </p>

                      <div className="flex items-center gap-1 text-primary text-xs font-medium">
                        <span>Baca</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <Link href="/artikel">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-transparent text-primary hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg border border-primary/20 transition-all duration-300 group text-sm"
                >
                  <span>Lihat Semua Artikel</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
