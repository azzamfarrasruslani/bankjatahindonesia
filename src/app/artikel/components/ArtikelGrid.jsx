"use client";

import { motion } from "framer-motion";
import ArtikelCard from "./ArtikelCard";
import ArtikelHighlight from "./ArtikelHighlight";
import { artikelList } from "../../../data/artikelData";

export default function ArtikelGrid() {
  const [highlight, ...others] = artikelList;

  return (
    <section className="px-6 sm:px-12 lg:px-24 py-16 space-y-12">
      {/* Highlight Artikel Teratas */}
      <ArtikelHighlight
        image={highlight.image}
        title={highlight.title}
        date={highlight.date}
        views={highlight.views}
        category={highlight.category}
        excerpt={highlight.excerpt}
      />

      {/* Grid Artikel Lain */}
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
            image={item.image}
            title={item.title}
            date={item.date}
            views={item.views}
            category={item.category}
            excerpt={item.excerpt}
            index={i}
          />
        ))}
      </motion.div>
    </section>
  );
}
