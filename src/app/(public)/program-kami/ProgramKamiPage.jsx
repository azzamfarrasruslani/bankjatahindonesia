"use client";

import HeroSection from "@/components/common/HeroSection";
import ProgramSection from "./components/ProgramSection";
import { programs } from "./components/programData";

export default function ProgramKamiPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <HeroSection
        title="Program Unggulan Kami"
        description="Jelajahi berbagai inisiatif kami untuk mendaur ulang minyak jelantah dengan cara inovatif dan bermanfaat."
        imageUrl="/images/program-kami.jpeg"
      />

      <section className="px-6 sm:px-12 py-20 space-y-28">
        {programs.map((program, index) => (
          <ProgramSection
            key={index}
            program={program}
            isReverse={index % 2 === 1}
          />
        ))}
      </section>
    </main>
  );
}
