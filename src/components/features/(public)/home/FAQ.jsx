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
    <section className="bg-gradient-to-b from-white to-gray-50/30 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Left Section - Gambar dengan Height yang Lebih Pendek */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 relative flex"
          >
            <div className="relative rounded-2xl overflow-hidden group flex-1 min-h-[400px] lg:min-h-[450px]">
              <Image
                src="/images/faq.jpeg"
                alt="Pertanyaan Umum tentang Bank Jatah Indonesia"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
              
              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">{faqs.length}+</p>
                    <p className="text-xs text-gray-600">Pertanyaan</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/10 rounded-full blur-xl -z-10" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-primary/5 rounded-full blur-lg -z-10" />
            </div>
          </motion.div>

          {/* Right Section - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 flex items-center"
          >
            <div className="w-full space-y-6">
              {/* Header Section */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                    Bantuan & Dukungan
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Pertanyaan
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
                    Umum
                  </span>
                </h2>

                <p className="text-base text-gray-600 leading-relaxed">
                  Temukan jawaban lengkap seputar program Bank Jatah Indonesia 
                  dan pengelolaan minyak jelantah.
                </p>
              </div>

              {/* FAQ Accordion */}
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-100 h-16 rounded-xl"
                    />
                  ))}
                </div>
              ) : faqs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200"
                >
                  <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Belum Ada FAQ
                  </h3>
                  <p className="text-sm text-gray-600">
                    Pertanyaan umum akan segera tersedia.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {faqs.slice(0, 4).map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors duration-300"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Lightbulb className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-left text-sm pr-6 leading-relaxed">
                              {faq.pertanyaan}
                            </h3>
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                        >
                          <ChevronDown className="w-3 h-3 text-primary" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 pt-1 border-t border-gray-100">
                              <div className="flex gap-3">
                                <div className="w-0.5 bg-primary/20 rounded-full flex-shrink-0" />
                                <p className="text-gray-700 leading-relaxed text-xs">
                                  {faq.jawaban}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="pt-2"
              >
                <Link href="/faq">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 group text-sm"
                  >
                    <Users className="w-4 h-4" />
                    <span>Lihat Semua FAQ</span>
                    <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5" />
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