// components/home/FAQSection.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "Apa itu minyak jelantah?",
    answer:
      "Minyak jelantah adalah minyak goreng bekas pakai yang sudah tidak layak dikonsumsi namun masih memiliki nilai ekonomi.",
  },
  {
    question: "Bagaimana cara menabung minyak jelantah?",
    answer:
      "Kumpulkan minyak jelantah minimal 1 kg, lalu setor ke cabang Bank Jatah terdekat atau mitra yang bekerja sama.",
  },
  {
    question: "Apa manfaat menabung minyak jelantah?",
    answer:
      "Anda bisa mendapatkan saldo e-wallet, poin reward, bahkan berkontribusi terhadap lingkungan yang bersih.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#FB6B00] mb-4">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-gray-600 mb-10">
          Temukan jawaban atas pertanyaan umum seputar program minyak jelantah Bank Jatah Indonesia.
        </p>

        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center font-semibold text-lg text-black"
              >
                {faq.question}
                <span className="text-[#FB6B00] text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-gray-600 overflow-hidden"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/faq">
            <button className="bg-[#FB6B00] hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition">
              Lihat FAQ Lengkap
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
