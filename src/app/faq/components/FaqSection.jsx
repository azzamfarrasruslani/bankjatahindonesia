"use client";

import { useState } from "react";
import FaqItem from "./FaqItem";
import faqList from "@/data/faqData"; 

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="space-y-6">
      {faqList.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={index === openIndex}
          onClick={() => toggle(index)}
        />
      ))}
    </div>
  );
}
