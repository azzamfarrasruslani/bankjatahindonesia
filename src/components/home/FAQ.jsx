"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb, Users } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const { data, error } = await supabase
          .from("faq")
          .select("id, pertanyaan, jawaban, kategori, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setFaqs(data);
      } catch (err) {
        console.error("Gagal memuat FAQ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, []);

  return (
    <section className="bg-white py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Gambar */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
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

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-20 rounded-2xl"
                ></div>
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <p className="text-gray-500 italic">Belum ada data FAQ.</p>
          ) : (
            <div className="space-y-5">
              {faqs.slice(0, 3).map((faq, index) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-gray-800 hover:bg-orange-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb className="text-[#FB6B00]" />
                      <span>{faq.pertanyaan}</span>
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
                        {faq.jawaban}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

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
