"use client";

import HeroSection from "@/components/common/HeroSection";
import ProgramUtama from "./components/ProgramUtama";
import SejarahVisiMisi from "./components/SejarahVisiMisi";
import TargetPasar from "./components/TargetPasar";
import TimKami from "./components/TimKami";

export default function TentangKamiPage() {
  return (
    <section className="bg-white text-gray-800">
      <HeroSection
        title="Tentang Bank Jatah Indonesia"
        description="Memahami pentingnya pengelolaan minyak jelantah untuk lingkungan dan masyarakat. Mari bergabung dalam program kami!"
        imageUrl="/images/tentang-kami.png"
      />

      <div className="px-6 sm:px-12 lg:px-24 py-16 space-y-16">
        <SejarahVisiMisi />
        <ProgramUtama />
        <TargetPasar />
        <TimKami />
      </div>
    </section>
  );
}
