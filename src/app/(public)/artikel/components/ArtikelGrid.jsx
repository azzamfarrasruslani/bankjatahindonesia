"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
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

  if (loading) {
    return <p className="text-center py-10 text-orange-600 font-medium animate-pulse">Memuat artikel...</p>;
  }

  if (artikelList.length === 0) {
    return (
      <p className="text-center py-10 text-gray-400 italic">
        Belum ada artikel yang tercatat.
      </p>
    );
  }

  const highlight = artikelList.find((a) => a.is_top) || artikelList[0];
  const others = artikelList.filter((a) => a.id !== highlight.id);

  return (
    <section className="px-6 sm:px-12 lg:px-24 py-16 space-y-12">
      {/* Highlight Artikel */}
      <ArtikelHighlight
        id={highlight.id}
        image={highlight.gambar_url}
        title={highlight.judul}
        date={new Date(highlight.created_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
        views={highlight.views}
        excerpt={highlight.isi}
        category={highlight.kategori} // badge kategori
      />

      {/* Grid Artikel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {others.map((item, i) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ArtikelCard
              id={item.id}
              image={item.gambar_url}
              title={item.judul}
              date={new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              views={item.views}
              excerpt={item.isi}
              category={item.kategori} // badge kategori
              index={i}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
