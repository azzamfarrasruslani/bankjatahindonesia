"use client";

import HeroSection from "@/components/common/HeroSection";
import ArtikelGrid from "./components/ArtikelGrid";

export default function ArtikelPage() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection
        title="Artikel & Wawasan"
        description="Jelajahi kumpulan artikel, wawasan mendalam, dan berita terkini mengenai pengelolaan jelantah, ekonomi sirkular, dan dampak program Bank Jatah Indonesia."
        imageUrl="/images/artikel.jpeg"
      />
      <ArtikelGrid />
    </div>
  );
}
