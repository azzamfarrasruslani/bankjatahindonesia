"use client";
import { useState } from "react";
import FaqItem from "./FaqItem";

export default function FaqCategory({ section, categoryIdx }) {
  const [openIndex, setOpenIndex] = useState({});

  const toggle = (faqIdx) => {
    const key = `${categoryIdx}-${faqIdx}`;
    setOpenIndex((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-16 scroll-mt-32">
      <h2 className="text-2xl font-bold text-[#FB6B00] mb-2">{section.category}</h2>
      <p className="text-gray-600 mb-6">{section.description}</p>
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
    </div>
  );
}
