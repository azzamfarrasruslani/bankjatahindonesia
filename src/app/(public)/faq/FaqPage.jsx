"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/common/HeroSection";
import FaqSidebar from "./components/FaqSidebar";
import FaqCategory from "./components/FaqCategory";

export default function FaqPage() {
  const refs = useRef([]);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ambil data dari Supabase
  useEffect(() => {
    async function fetchFaq() {
      try {
        const { data, error } = await supabase
          .from("faq")
          .select("*")
          .order("kategori", { ascending: true })
          .order("created_at", { ascending: true });

        if (error) throw error;

        // Kelompokkan berdasarkan kategori
        const grouped = data.reduce((acc, item) => {
          const kategori = item.kategori || "Lainnya";
          if (!acc[kategori]) acc[kategori] = [];
          acc[kategori].push({
            q: item.pertanyaan,
            a: item.jawaban,
          });
          return acc;
        }, {});

        // Ubah jadi array agar bisa di-map
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
  };

  // Skeleton loading
  const skeleton = useMemo(() => (
    <div className="animate-pulse flex flex-col gap-8 py-10">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 bg-orange-100 rounded w-1/3"></div>
          <div className="h-4 bg-orange-50 rounded w-3/4"></div>
          <div className="h-4 bg-orange-50 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  ), []);

  return (
    <section className="bg-[#fffefc] text-gray-800">
      <HeroSection
        title="Pusat Pertanyaan Umum"
        description="Temukan jawaban atas pertanyaan seputar program Bank Jatah Indonesia, mulai dari Tabungan Jelantah, Jual Beli Jelantah, hingga Sedekah Jelantah."
        imageUrl="/images/faq-banner.jpeg"
      />

      <div className="flex flex-col lg:flex-row gap-12 py-16 px-6 sm:px-12 lg:px-24">
        <FaqSidebar
          faqData={faqData}
          scrollToCategory={scrollToCategory}
          activeIndex={activeIndex}
        />

        <div className="flex-1">
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
