"use client";

import HeroSection from "@/components/common/HeroSection";
import ArtikelGrid from "./components/ArtikelGrid";

export default function ArtikelPage() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection
        title="Pusat Pertanyaan Umum"
        description="Temukan jawaban atas pertanyaan seputar program Bank Jatah Indonesia, mulai dari Tabungan Jelantah, Jual Beli Jelantah, hingga Sedekah Jelantah."
        imageUrl="/images/faq-banner.jpg"
      />

      <ArtikelGrid />
    </div>
  );
}
