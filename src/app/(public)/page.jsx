// src/app/(public)/page.jsx

import Hero from "@/components/features/(public)/home/Hero";
import ProgramBankJatah from "@/components/features/(public)/home/ProgramBankJatah";
import ParallaxSection from "@/components/features/(public)/home/ParallaxSection";
import ManfaatJelantah from "@/components/features/(public)/home/ManfaatJelantah";
import Mitra from "@/components/features/(public)/home/Mitra";
import TestimoniMasyarakat from "@/components/features/(public)/home/TestimoniMasyarakat";
import FAQ from "@/components/features/(public)/home/FAQ";
import ArtikelSection from "@/components/features/(public)/home/ArtikelSection";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Manfaat Jelantah */}
      <ManfaatJelantah />

      {/* Program Bank Jatah */}
      <section className="w-full bg-white relative pt-0 pb-20 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <ProgramBankJatah />
      </section>

      {/* Parallax Visual Section */}
      <ParallaxSection />

      {/* Mitra Penampung */}
      <Mitra />

      {/* Testimoni Masyarakat */}
      <TestimoniMasyarakat />

      {/* FAQ */}
      <FAQ />

      {/* Artikel & Berita */}
      <ArtikelSection />
    </div>
  );
}
