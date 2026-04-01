"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb, Users, ChevronDown, HelpCircle } from "lucide-react";
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
    <section className="bg-white py-20 px-6 relative overflow-hidden border-t border-gray-50">
      {/* Background Decoratives - Minimalist */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#f97316 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section - Centered & Compact */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-200 bg-orange-50 rounded-full shadow-sm mx-auto"
          >
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-orange-600 tracking-[0.2em] uppercase">Bantuan & Dukungan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-black leading-tight uppercase tracking-tighter"
          >
            Pertanyaan <span className="text-orange-500">Umum</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Temukan jawaban lengkap seputar program Bank Jatah Indonesia dan panduan mudah mengelola limbah minyak jelantah Anda.
          </motion.p>
        </div>

        {/* FAQ Accordion List - Constrained Width */}
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-gray-50 h-16 rounded-3xl border border-gray-100" />
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-[2.5rem] p-12 text-center border border-gray-100 border-dashed"
            >
              <HelpCircle className="w-10 h-10 text-orange-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-black mb-1">Belum Ada FAQ</h3>
              <p className="text-gray-400 font-normal text-sm">Pusat bantuan mengenai pertanyaan umum akan segera hadir.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                      isOpen
                        ? "border-orange-200 shadow-[0_15px_40px_rgba(249,115,22,0.08)]"
                        : "border-gray-50 shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:border-orange-100"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full px-6 py-5 flex justify-between items-center text-left transition-colors duration-300 ${
                        isOpen ? "bg-orange-50/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-5 flex-1 pr-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          isOpen ? "bg-orange-500 text-white scale-110 shadow-lg" : "bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500"
                        }`}>
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <h3 className={`font-black text-base sm:text-lg leading-tight tracking-tight transition-colors duration-300 ${
                          isOpen ? "text-orange-600" : "text-black group-hover:text-orange-600"
                        }`}>
                          {faq.pertanyaan}
                        </h3>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isOpen ? "bg-orange-100 text-orange-600 rotate-180" : "bg-gray-50 text-gray-300 group-hover:text-orange-500 rotate-0"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                        >
                          <div className="px-6 pb-6 pt-2 bg-orange-50/20">
                            <div className="flex gap-4 sm:ml-14 border-l-2 border-orange-200 pl-4 py-1">
                              <p className="text-gray-500 font-normal leading-relaxed text-sm sm:text-base">
                                {faq.jawaban}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Centered CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/faq">
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 bg-black text-white font-black px-10 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-orange-500/20 group"
              >
                <span className="uppercase tracking-[0.1em] text-xs">Lihat Semua FAQ</span>
                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
