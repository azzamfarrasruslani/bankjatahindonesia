"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BeritaHeading from "./components/BeritaHeading";
import BeritaTopCard from "./components/BeritaTopCard";
import BeritaCard from "./components/BeritaCard";

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBeritaList(data);
      } catch (err) {
        console.error("Gagal memuat data berita:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-600 py-20">Memuat berita...</div>
    );

  if (!beritaList.length)
    return (
      <div className="text-center text-gray-600 py-20">
        Belum ada berita yang tersedia.
      </div>
    );

  const topNews = beritaList.find((b) => b.is_top);
  const otherNews = beritaList.filter((b) => !b.is_top);

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <BeritaHeading />

      {topNews && (
        <BeritaTopCard
          berita={{
            title: topNews.title,
            image: topNews.image_url,
            date: new Date(topNews.created_at).toLocaleDateString("id-ID"),
            views: topNews.views || 0,
          }}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherNews.map((item, i) => (
          <BeritaCard
            key={item.id}
            berita={{
              title: item.title,
              image: item.image_url,
              date: new Date(item.created_at).toLocaleDateString("id-ID"),
              views: item.views || 0,
              excerpt:
                item.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
            }}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
