"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ArtikelHighlight from "./ArtikelHighlight";
import ArtikelCard from "./ArtikelCard";

export default function ArtikelGrid() {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const { data, error } = await supabase
          .from("artikel")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setArtikelList(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtikel();
  }, []);

  // Skeleton helper
  const skeletonArray = Array.from({ length: 3 });

  if (loading) {
    return (
      <section className="px-6 sm:px-12 lg:px-24 py-16 space-y-12">
        {/* Skeleton Highlight */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 animate-pulse bg-gray-200 rounded h-8 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skeletonArray.map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* Skeleton Artikel Terkini */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 animate-pulse bg-gray-200 rounded h-8 w-44" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skeletonArray.map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (artikelList.length === 0) {
    return <p className="text-center py-10 text-gray-400 italic">Belum ada artikel yang tercatat.</p>;
  }

  // Ambil artikel dengan is_top = true untuk highlight
  let highlightArtikel = artikelList.filter(a => a.is_top)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  // Artikel lainnya
  const otherArtikel = artikelList.filter(a => !highlightArtikel.includes(a));

  return (
    <section className="px-6 sm:px-12 lg:px-24 py-16 space-y-12">
      {/* Artikel Populer */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Artikel Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightArtikel.map(item => (
            <ArtikelHighlight
              key={item.id}
              id={item.id}
              image={item.gambar_url}
              title={item.judul}
              date={item.created_at}
            />
          ))}
        </div>
      </div>

      {/* Artikel Terkini */}
      {otherArtikel.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Artikel Terkini</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  );
}
