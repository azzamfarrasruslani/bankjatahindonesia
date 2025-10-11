"use client";

import { beritaList } from "@/data/beritaData";
import BeritaHeading from "./components/BeritaHeading";
import BeritaTopCard from "./components/BeritaTopCard";
import BeritaCard from "./components/BeritaCard";

export default function BeritaPage() {
  const topNews = beritaList.find((b) => b.isTop);
  const otherNews = beritaList.filter((b) => !b.isTop);

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <BeritaHeading />

      {topNews && <BeritaTopCard berita={topNews} />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherNews.map((item, i) => (
          <BeritaCard key={item.id} berita={item} index={i} />
        ))}
      </div>
    </section>
  );
}
