"use client";

import HeroSection from "@/components/common/HeroSection";
import ArtikelGrid from "./components/ArtikelGrid";

export default function ArtikelPage() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection
        title="Artikel & Informasi"
        description="Dapatkan wawasan terbaru seputar pengelolaan minyak jelantah, inovasi berkelanjutan, dan kisah inspiratif dari masyarakat."
        imageUrl="/images/artikel.jpeg"
      />
      <ArtikelGrid />
    </div>
  );
}
