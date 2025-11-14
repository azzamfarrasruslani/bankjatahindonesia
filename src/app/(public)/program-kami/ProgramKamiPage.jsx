"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import HeroSection from "@/components/common/HeroSection";
import ProgramSection from "./components/ProgramSection";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProgramKamiPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const { data, error } = await supabase
          .from("program")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setPrograms(data || []);
      } catch (err) {
        console.error("Gagal mengambil data program:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Program Unggulan Kami"
        description="Jelajahi berbagai inisiatif inovatif kami untuk mendaur ulang minyak jelantah menjadi solusi berkelanjutan yang menguntungkan."
        imageUrl="/images/program-kami.jpeg"
      />

      {/* Programs Section */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            // Enhanced Skeleton Loading
            <div className="space-y-20">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Skeleton */}
                  <div className="w-full lg:w-1/2">
                    <div className="bg-gray-200 rounded-2xl h-80 lg:h-96 animate-pulse" />
                  </div>
                  
                  {/* Content Skeleton */}
                  <div className="w-full lg:w-1/2 space-y-4">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                      <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </div>
                    <div className="h-20 bg-gray-100 rounded animate-pulse" />
                    <div className="h-12 w-40 bg-gray-300 rounded-xl animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : programs.length > 0 ? (
            <div className="space-y-20 lg:space-y-28">
              {programs.map((program, index) => (
                <ProgramSection
                  key={program.id}
                  program={{
                    id: program.id,
                    title: program.title,
                    status: program.status,
                    shortDescription: program.short_description || program.description?.split(".")[0] || "Program peduli lingkungan melalui pengelolaan jelantah.",
                    fullDescription: program.description,
                    steps: program.details || [],
                    href: `/program/${program.slug || program.id}`,
                    img: program.image_url || program.icon_url || "/images/default-program.jpg",
                  }}
                  isReverse={index % 2 === 1}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-2xl p-12 max-w-md mx-auto border border-gray-200 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum Ada Program
                </h3>
                <p className="text-gray-600">
                  Program akan segera tersedia.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}