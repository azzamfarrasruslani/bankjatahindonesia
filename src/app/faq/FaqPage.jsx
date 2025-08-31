"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqList = [
  {
    question: "Apa itu Bank Jatah Indonesia?",
    answer:
      "Bank Jatah Indonesia adalah inisiatif sosial dan lingkungan untuk mengelola minyak jelantah menjadi nilai ekonomi dan mendukung keberlanjutan.",
  },
  {
    question: "Bagaimana cara menabung minyak jelantah?",
    answer:
      "Cukup kumpulkan minyak jelantah, daftarkan akun Anda, lalu antarkan atau tunggu penjemputan sesuai wilayah layanan kami.",
  },
  {
    question: "Apakah layanan ini gratis?",
    answer:
      "Ya, seluruh layanan seperti pengumpulan, edukasi, dan tabungan jelantah tidak dipungut biaya.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-12 text-center">
        Pertanyaan Umum (FAQ)
      </h1>

      <div className="space-y-6">
        {faqList.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-medium text-lg text-gray-800 hover:bg-gray-50"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-700 text-base leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
