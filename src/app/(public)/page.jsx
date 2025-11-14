// src/app/(public)/page.jsx

import Hero from "@/components/features/(public)/home/Hero";
import TentangKami from "@/components/features/(public)/home/TentangKami";
import ProgramBankJatah from "@/components/features/(public)/home/ProgramBankJatah";
import ParallaxSection from "@/components/features/(public)/home/ParallaxSection";
import ManfaatJelantah from "@/components/features/(public)/home/ManfaatJelantah";
import Mitra from "@/components/features/(public)/home/Mitra";
import TestimoniMasyarakat from "@/components/features/(public)/home/TestimoniMasyarakat";
import FAQ from "@/components/features/(public)/home/FAQ";
import ArtikelSection from "@/components/features/(public)/home/ArtikelSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Hero */}
      <Hero />

      {/* Tentang Kami */}
      <section id="tentangkami" className="py-20 px-6 bg-white">
        <TentangKami />
      </section>

      {/* Program Bank Jatah */}
      <section id="program" className="py-20 px-6 bg-white">
        <ProgramBankJatah />
      </section>

      {/* Parallax Visual Section */}
      <ParallaxSection />

      {/* Manfaat Jelantah */}
      <section id="manfaat" className="py-20 px-6 bg-white">
        <ManfaatJelantah />
      </section>

      {/* Mitra Penampung */}
      <section id="mitra" className="py-20 px-6 bg-white">
        <Mitra />
      </section>

      {/* Testimoni Masyarakat */}
      <section id="testimoni" className="py-20 px-6 bg-white">
        <TestimoniMasyarakat />
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white">
        <FAQ />
      </section>

      {/* Artikel & Berita */}
      <section id="berita" className="py-20 px-6 bg-white">
        <ArtikelSection />
      </section>
    </div>
  );
}
