"use client";
import { useState } from "react";
import FaqItem from "./FaqItem";
import { HelpCircle } from "lucide-react";

export default function FaqCategory({ section, categoryIdx }) {
  const [openIndex, setOpenIndex] = useState({});

  const toggle = (faqIdx) => {
    const key = `${categoryIdx}-${faqIdx}`;
    // Memungkinkan multiple open, atau behavior accordion klasik
    setOpenIndex((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-20 scroll-mt-32 relative">
      {/* Section Header */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
            <HelpCircle className="w-5 h-5 text-orange-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            {section.category}
          </h2>
        </div>
        <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed max-w-2xl pl-14">
          {section.description}
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {section.faqs.map((faq, faqIdx) => {
          const key = `${categoryIdx}-${faqIdx}`;
          return (
            <FaqItem
              key={faqIdx}
              faq={faq}
              isOpen={openIndex[key]}
              onToggle={() => toggle(faqIdx)}
            />
          );
        })}
      </div>

      {/* Decorative Line End */}
      <div className="mt-16 w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent" />
    </div>
  );
}
