"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/common/HeroSection";
import FaqSidebar from "./components/FaqSidebar";
import FaqCategory from "./components/FaqCategory";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqPage() {
  const refs = useRef([]);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Deteksi lebar layar
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize(); // init saat mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch FAQ dari Supabase
  useEffect(() => {
    async function fetchFaq() {
      try {
        const { data, error } = await supabase
          .from("faq")
          .select("*")
          .order("kategori", { ascending: true })
          .order("created_at", { ascending: true });

        if (error) throw error;

        const grouped = data.reduce((acc, item) => {
          const kategori = item.kategori || "Lainnya";
          if (!acc[kategori]) acc[kategori] = [];
          acc[kategori].push({ q: item.pertanyaan, a: item.jawaban });
          return acc;
        }, {});

        const formatted = Object.entries(grouped).map(([category, faqs]) => ({
          category,
          description: `Pertanyaan umum seputar kategori ${category}.`,
          faqs,
        }));

        setFaqData(formatted);
      } catch (err) {
        console.error("Gagal memuat data FAQ:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFaq();
  }, []);

  const scrollToCategory = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(index);
    setSidebarOpen(false); // tutup sidebar mobile
  };

  // Skeleton loading
  const skeleton = useMemo(
    () => (
      <div className="animate-pulse flex flex-col gap-10 py-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4 border-b border-orange-200 pb-6">
            <div className="h-6 bg-orange-100 rounded w-1/2"></div>
            <div className="h-4 bg-orange-50 rounded w-5/6"></div>
            <div className="h-4 bg-orange-50 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    ),
    []
  );

  return (
    <section className="bg-[#fffefc] text-gray-800 min-h-screen">
      <HeroSection
        title="Pusat Pertanyaan Umum"
        description="Temukan jawaban atas pertanyaan seputar program Bank Jatah Indonesia."
        imageUrl="/images/faq-banner.jpeg"
      />

      <div className="flex flex-col lg:flex-row gap-8 py-16 px-4 sm:px-6 lg:px-24">
        {/* Sidebar */}
        <div className="lg:w-64">
          <button
            className="lg:hidden mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-md font-semibold w-full hover:bg-orange-200 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Tutup Kategori" : "Buka Kategori"}
          </button>

          <AnimatePresence>
            {(sidebarOpen || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FaqSidebar
                  faqData={faqData}
                  scrollToCategory={scrollToCategory}
                  activeIndex={activeIndex}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  isDesktop={isDesktop}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Konten FAQ */}
        <div className="flex-1 space-y-12">
          {loading ? (
            skeleton
          ) : faqData.length > 0 ? (
            faqData.map((section, index) => (
              <div key={index} ref={(el) => (refs.current[index] = el)}>
                <FaqCategory section={section} categoryIdx={index} />
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center italic py-10">
              Tidak ada data FAQ ditemukan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
