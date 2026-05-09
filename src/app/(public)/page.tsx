// src/app/(public)/page.jsx

import { Hero } from '@/features/home';
import { ProgramBankJatah } from '@/features/home';
import { ParallaxSection } from '@/features/home';
import { ManfaatJelantah } from '@/features/home';
import { Mitra } from '@/features/home';
import { TestimoniMasyarakat } from '@/features/home';
import { FAQ } from '@/features/home';
import { ArtikelSection } from '@/features/home';

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
