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
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-gray-50">
      {/* Subtle Background Ornaments */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent opacity-80 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-1/4 h-1/3 bg-[radial-gradient(circle_at_center_right,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Section - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-[0_10px_40px_rgba(249,115,22,0.1)] bg-gray-50 border border-gray-100">
              <Image
                src="/images/faq.jpeg"
                alt="Pertanyaan Umum tentang Bank Jatah Indonesia"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-80" />

              {/* Floating Info Pill */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 bg-white/95 backdrop-blur-md rounded-full px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-black text-gray-900 leading-none mb-1">
                    {faqs.length}+
                  </p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Pertanyaan
                  </p>
                </div>
              </motion.div>

              {/* Ambient accent behind image */}
              <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full border-[3px] border-orange-100 rounded-[2.5rem]" />
            </div>
          </motion.div>

          {/* Right Section - FAQ Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 flex items-center"
          >
            <div className="w-full space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-5 py-2 border border-orange-200 bg-orange-50 rounded-full shadow-sm w-fit">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
                    Bantuan & Dukungan
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tight">
                  Pertanyaan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    Umum
                  </span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  Temukan jawaban lengkap seputar program Bank Jatah Indonesia
                  dan panduan mudah mengelola minyak jelantah Anda.
                </p>
              </div>

              {/* FAQ Accordion List */}
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-50 h-20 rounded-[2rem] border border-gray-100"
                    />
                  ))}
                </div>
              ) : faqs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 border-dashed"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-sm">
                    <HelpCircle className="w-8 h-8 text-orange-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Belum Ada FAQ
                  </h3>
                  <p className="text-gray-500 font-light text-sm">
                    Pusat bantuan mengenai pertanyaan umum akan segera
                    ditambahkan.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {faqs.slice(0, 4).map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`group relative bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                          isOpen
                            ? "border-orange-300 shadow-[0_8px_30px_rgba(249,115,22,0.12)]"
                            : "border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)]"
                        }`}
                      >
                        <button
                          onClick={() => toggleFAQ(index)}
                          className={`w-full px-6 py-5 flex justify-between items-center text-left transition-colors duration-300 ${
                            isOpen ? "bg-orange-50/30" : "hover:bg-gray-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1 pr-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                                isOpen
                                  ? "bg-orange-500 text-white shadow-sm"
                                  : "bg-orange-50 text-orange-500 group-hover:bg-orange-100"
                              }`}
                            >
                              <Lightbulb className="w-6 h-6" />
                            </div>
                            <h3
                              className={`font-bold text-base sm:text-lg leading-tight transition-colors duration-300 ${
                                isOpen
                                  ? "text-orange-600"
                                  : "text-gray-900 group-hover:text-orange-600"
                              }`}
                            >
                              {faq.pertanyaan}
                            </h3>
                          </div>

                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                              isOpen
                                ? "bg-orange-100 text-orange-600 rotate-180"
                                : "bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500"
                            }`}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-6 pb-6 pt-2 bg-orange-50/30">
                                <div className="flex gap-4 ml-16">
                                  {/* Orange Accent Line */}
                                  <div className="w-1 bg-gradient-to-b from-orange-400 to-orange-200 rounded-full flex-shrink-0" />
                                  <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base pb-2">
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

              {/* Elegant Modern CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <Link href="/faq">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 bg-gray-900 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.3)] group"
                  >
                    <span>Lihat Semua FAQ</span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-orange-600 transition-colors">
                      <ChevronDown className="w-4 h-4 -rotate-90 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
