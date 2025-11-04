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
    // Skeleton loading
    return (
      <section className="px-6 sm:px-12 lg:px-24 py-16 space-y-12">
        {/* Skeleton Highlight */}
        <div className="animate-pulse flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-md overflow-hidden p-6 min-h-[480px]">
          <div className="bg-gray-200 rounded-2xl w-full h-80 lg:w-1/2 lg:h-auto" />
          <div className="flex flex-col justify-between lg:w-1/2 flex-grow gap-4">
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 w-3/4 rounded" />
              <div className="bg-gray-200 h-4 w-1/2 rounded" />
              <div className="bg-gray-200 h-20 w-full rounded" />
            </div>
            <div className="bg-gray-200 h-10 w-40 rounded" />
          </div>
        </div>

        {/* Skeleton Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col animate-pulse"
            >
              <div className="bg-gray-200 h-48 w-full" />
              <div className="p-6 flex flex-col justify-between flex-grow gap-3">
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-1/3 rounded" />
                  <div className="bg-gray-200 h-4 w-2/3 rounded" />
                  <div className="bg-gray-200 h-16 w-full rounded" />
                </div>
                <div className="bg-gray-200 h-8 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
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
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {others.map((item, i) => (
          <ArtikelCard
            key={item.id}
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
            index={i}
          />
        ))}
      </motion.div>
    </section>
  );
}
