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
    <section className="bg-white py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Image dengan efek */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl duration-500">
          <Image
            src="/images/faq.jpeg"
            alt="Ilustrasi FAQ"
            width={600}
            height={500}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Right Section - FAQ Accordion */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#FB6B00] mb-3">
            FAQ
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg">
            Temukan jawaban atas pertanyaan umum seputar minyak jelantah dan
            program Bank Jatah Indonesia.
          </p>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-gray-800 hover:bg-orange-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="text-[#FB6B00]" />
                    <span>{faq.question}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    className="text-[#FB6B00] text-xl"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4 text-gray-600 text-sm"
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
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#FB6B00] to-orange-400 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition">
                <Users className="w-5 h-5" /> Lihat FAQ Lengkap
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
