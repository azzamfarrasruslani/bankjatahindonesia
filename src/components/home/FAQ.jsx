"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Lightbulb, Users, Leaf } from "lucide-react";
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
    <section className="bg-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Image & Benefits */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/faq.jpeg" // Ganti dengan ilustrasi kamu
            alt="Ilustrasi FAQ"
            width={600}
            height={500}
            className="w-full h-[500px]  object-cover"
          />
        </div>

        {/* Right Section - FAQ Accordion */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FB6B00] mb-4">
            FAQ (Pertanyaan yang Sering Diajukan)
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg">
            Temukan jawaban atas semua pertanyaan umum seputar minyak jelantah dan program Bank Jatah Indonesia.
          </p>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left text-gray-800 font-semibold hover:bg-orange-50 transition"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#FB6B00] text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-4 text-sm text-gray-600"
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
      </div>
    </section>
  );
}
