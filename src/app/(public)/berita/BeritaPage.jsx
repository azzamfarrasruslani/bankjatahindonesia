"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BeritaHeading from "./components/BeritaHeading";
import BeritaTopCard from "./components/BeritaTopCard";
import BeritaCard from "./components/BeritaCard";

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

  if (loading)
    return (
      <div className="text-center text-gray-600 py-20 animate-pulse">
        Memuat berita...
      </div>
    );

  if (!beritaList.length)
    return (
      <div className="text-center text-gray-600 py-20">
        Belum ada berita yang tersedia.
      </div>
    );

  // Ambil berita unggulan
  const topNews = beritaList.find((b) => b.is_top) || beritaList[0];
  const otherNews = beritaList.filter((b) => b.id !== topNews.id);

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <BeritaHeading />

      {/* Berita unggulan */}
      {topNews && (
        <BeritaTopCard
          berita={{
            id: topNews.id, // fix: kirim id untuk link detail
            judul: topNews.judul,
            gambar_url: topNews.gambar_url,
            created_at: topNews.created_at,
            penulis: topNews.penulis,
          }}
        />
      )}

      {/* Daftar berita lainnya */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {otherNews.map((item, i) => (
          <BeritaCard key={item.id} berita={item} index={i} />
        ))}
      </div>
    </section>
  );
}
