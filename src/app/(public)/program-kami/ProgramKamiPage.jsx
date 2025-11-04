"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import HeroSection from "@/components/common/HeroSection";
import ProgramSection from "./components/ProgramSection";

// Supabase client
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
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero selalu tampil */}
      <HeroSection
        title="Program Unggulan Kami"
        description="Jelajahi berbagai inisiatif kami untuk mendaur ulang minyak jelantah dengan cara inovatif dan bermanfaat."
        imageUrl="/images/program-kami.jpeg"
      />

      <section className="px-6 sm:px-12 py-20 space-y-28">
        {loading ? (
          // SKELETON LOADING untuk daftar program
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-10 md:gap-12 items-start ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-5/12 w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 animate-pulse h-80" />
              <div className="md:w-7/12 space-y-5">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                <div className="h-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse" />
              </div>
            </div>
          ))
        ) : programs.length > 0 ? (
          programs.map((program, index) => (
            <ProgramSection
              key={program.id}
              program={{
                title: program.title,
                status: program.status,
                shortDescription:
                  program.description?.split(".")[0] ||
                  "Program peduli lingkungan melalui pengelolaan jelantah.",
                fullDescription: program.description,
                steps: program.details || [],
                href: "#",
                img: program.icon_url || "/images/default-program.jpg",
              }}
              isReverse={index % 2 === 1}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Belum ada program yang tersedia.
          </div>
        )}
      </section>
    </main>
  );
}
