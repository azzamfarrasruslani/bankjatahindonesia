"use client";

import { useEffect, useState } from "react";
import { fetchProgram } from "@/lib/services/programService";
import HeroSection from "@/components/common/HeroSection";
import ProgramSection from "./components/ProgramSection";
import { motion, AnimatePresence } from "framer-motion";
import { CopySlash } from "lucide-react";

export default function ProgramKamiPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await fetchProgram();
        setPrograms(data || []);
      } catch (err) {
        console.error("Gagal mengambil data program:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPrograms();
  }, []);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Epic Hero Section Integration */}
      <HeroSection
        title="Program Inovasi Kami"
        description="Jelajahi berbagai inisiatif cerdas kami untuk mendaur ulang minyak jelantah menjadi solusi berkelanjutan yang berdampak nyata dan menguntungkan bagi semua pihak."
        imageUrl="/images/program-kami.jpeg"
      />

      {/* Main Programs Area */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              // Premium Skeleton Loading
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col bg-white rounded-[2.5rem] p-6 lg:p-8 border border-gray-100 shadow-sm h-full"
                  >
                    <div className="bg-gray-100 rounded-[1.5rem] aspect-[4/3] w-full animate-pulse mb-6 shimmer-bg" />
                    <div className="space-y-4 flex-grow">
                      <div className="h-4 w-32 bg-orange-50 rounded-full animate-pulse" />
                      <div className="h-8 bg-gray-100 rounded-2xl w-3/4 animate-pulse" />
                      <div className="space-y-2 pt-2">
                        <div className="h-4 bg-gray-50 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-gray-50 rounded-full w-5/6 animate-pulse" />
                      </div>
                    </div>
                    <div className="pt-8 mt-auto">
                      <div className="h-14 w-full bg-gray-100 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : programs.length > 0 ? (
              // Program List Rendering
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              >
                {programs.map((program, index) => (
                  <ProgramSection
                    key={program.id}
                    program={{
                      id: program.id,
                      title: program.title,
                      status: program.status,
                      shortDescription:
                        program.short_description ||
                        program.description?.split(".")[0] ||
                        "Program peduli lingkungan melalui pengelolaan jelantah terintegrasi.",
                      fullDescription: program.description,
                      steps: program.details || [],
                      href: `/program/${program.slug || program.id}`,
                      img:
                        program.image_url ||
                        program.icon_url ||
                        "/images/default-program.jpg",
                    }}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              // Empty State
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 lg:py-32"
              >
                <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-20 max-w-2xl mx-auto border border-gray-100 shadow-inner border-dashed relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-60" />
                  <div className="relative z-10 w-24 h-24 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CopySlash className="w-10 h-10 text-orange-400" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    Katalog Program Kosong
                  </h3>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">
                    Saat ini belum ada program unggulan yang dipublikasikan.
                    Silakan kembali lagi nanti untuk melihat pembaruan inisiatif
                    terbaru kami.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
