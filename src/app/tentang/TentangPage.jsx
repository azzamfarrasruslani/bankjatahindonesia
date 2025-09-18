"use client";

import { motion } from "framer-motion";

import HeroSection from "./components/HeroSection";
import ProgramUtama from "./components/ProgramUtama";
// import NilaiNilai from "./components/NilaiNilai"; // jika aktif
import SejarahVisiMisi from "./components/SejarahVisiMisi";
import TargetPasar from "./components/TargetPasar";
import TimKami from "./components/TimKami";

export default function TentangPage() {
  return (
    <section className="bg-white text-gray-800">
      <HeroSection />

      <div className="px-6 sm:px-12 lg:px-24 py-16 space-y-16">
        <SejarahVisiMisi />
        <ProgramUtama />
        <TargetPasar />
        {/* <NilaiNilai /> */}
        <TimKami />
      </div>
    </section>
  );
}
