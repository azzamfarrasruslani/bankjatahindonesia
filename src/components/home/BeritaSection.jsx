"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BeritaSection() {
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

  if (newsArticles.length === 0) return null; // sementara loading bisa ditambahkan

  return (
    <section id="berita" className="py-20 px-4 sm:px-8 ">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
          Baca Artikel Terbaru
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Temukan berbagai wawasan dan informasi seputar lingkungan, pengelolaan
          minyak jelantah, dan gaya hidup ramah lingkungan.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Artikel besar (kiri) */}
        <div className="flex-[2]">
          <Link
            href={newsArticles[0].href}
            className="block group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="relative h-80 w-full">
              <Image
                src={newsArticles[0].image}
                alt={newsArticles[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="bg-[#FB6B00] text-white px-2 py-1 text-xs rounded-full">
                  {newsArticles[0].category}
                </span>
                <span>{newsArticles[0].date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FB6B00] transition">
                {newsArticles[0].title}
              </h3>
              <p className="mt-3 text-sm text-[#FB6B00] font-medium">
                Read More →
              </p>
            </div>
          </Link>
        </div>

        {/* Artikel kecil (kanan - vertikal 3 item) */}
        <div className="flex flex-col gap-3 flex-[2]">
          {newsArticles.slice(1).map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="group flex items-start gap-3 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition p-3"
            >
              {/* Gambar kiri */}
              <div className="relative w-32 h-32 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Konten kanan */}
              <div className="flex flex-col justify-between flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span className="bg-[#FB6B00] text-white px-2 py-0.5 text-[10px] rounded-full">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#FB6B00] leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#FB6B00] font-medium mt-1">
                  Read More →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
