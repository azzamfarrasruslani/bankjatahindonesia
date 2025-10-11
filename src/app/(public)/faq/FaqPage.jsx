"use client";
import { useRef } from "react";
import HeroSection from "@/components/common/HeroSection";
import FaqSidebar from "./components/FaqSidebar";
import FaqCategory from "./components/FaqCategory";
import { faqData } from "@/data/faqData";

export default function FaqPage() {
  const refs = useRef([]);

  const scrollToCategory = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#fffefc] text-gray-800 ">
      <HeroSection
        title="Pusat Pertanyaan Umum"
        description="Temukan jawaban atas pertanyaan seputar program Bank Jatah Indonesia, mulai dari Tabungan Jelantah, Jual Beli Jelantah, hingga Sedekah Jelantah."
        imageUrl="/images/faq-banner.jpeg"
      />

      <div className="flex flex-col lg:flex-row gap-12 py-16 px-6 sm:px-12 lg:px-24">
        <FaqSidebar faqData={faqData} scrollToCategory={scrollToCategory} />
        <div className="flex-1">
          {faqData.map((section, index) => (
            <div key={index} ref={(el) => (refs.current[index] = el)}>
              <FaqCategory section={section} categoryIdx={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
