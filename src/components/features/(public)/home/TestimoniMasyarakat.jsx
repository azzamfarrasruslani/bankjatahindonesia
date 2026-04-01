"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function TestimoniMasyarakat() {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleCount = 3;

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const { data, error } = await supabase
          .from("testimoni")
          .select(
            "nama_pengguna, profesi, isi_testimoni, rating, created_at, foto_url",
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        const mappedData = data.map((item) => ({
          nama: item.nama_pengguna,
          profesi: item.profesi || "Pengguna",
          isi: item.isi_testimoni,
          rating: item.rating,
          tanggal: item.created_at,
          photo: item.foto_url || "/images/tentang-kami.png",
        }));

        setTestimonies(mappedData);
      } catch (err) {
        console.error("Gagal memuat testimoni:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonies.length - visibleCount) : prev - 1,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev >= testimonies.length - visibleCount ? 0 : prev + 1,
    );
  };

  const visibleTestimonies = testimonies.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="animate-pulse rounded-[2rem] p-8 bg-white border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-orange-50 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-100 rounded-full w-24 mb-2"></div>
          <div className="h-3 bg-gray-50 rounded-full w-16"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-50 rounded-full w-full"></div>
        <div className="h-4 bg-gray-50 rounded-full w-3/4"></div>
        <div className="h-4 bg-gray-50 rounded-full w-1/2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-orange-50 rounded-full w-48 mb-6"></div>
              <div className="h-12 bg-gray-100 rounded-full w-96 mb-6"></div>
              <div className="h-4 bg-gray-50 rounded-full w-3/4 max-w-xl"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonies.length === 0) {
    return (
      <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[2.5rem] p-16 border border-gray-100 shadow-sm border-dashed"
          >
            <div className="w-24 h-24 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Quote className="w-10 h-10 text-orange-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Belum Ada Testimoni
            </h3>
            <p className="text-gray-500 font-light">
              Kisah inspiratif dari pengguna Bank Jatah akan segera hadir di
              sini.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6 relative overflow-hidden border-t border-gray-50">
      {/* Background Decoratives - Minimalist Grid */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#f97316 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Modern SaaS Centered */}
        <div className="text-center mb-16 lg:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-200 bg-orange-50 rounded-full shadow-sm mx-auto"
          >
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-orange-600 tracking-[0.2em] uppercase">Suara Pengguna</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-black leading-tight uppercase tracking-tighter"
          >
            Testimoni <span className="text-orange-500">Masyarakat</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Kisah nyata dari para pengguna yang telah berkontribusi menjaga kelestarian alam dan merasakan langsung manfaat program Bank Jatah.
          </motion.p>
        </div>

        {/* Testimonials Grid/Slider Container */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleTestimonies.map((testi, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(249,115,22,0.12)] hover:border-orange-100 transition-all duration-700 flex flex-col h-full overflow-hidden"
                >
                  {/* Subtle Gradient Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-50 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Upper Row: Profile & Quote Icon */}
                    <div className="flex items-start justify-between mb-8">
                       <div className="flex items-center gap-4">
                          {/* Initial Avatar - SaaS Style */}
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-black font-black text-xl border border-gray-100 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                            {testi.nama.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-black text-base leading-none tracking-tight group-hover:text-orange-600 transition-colors">
                              {testi.nama}
                            </h4>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                              Masyarakat
                            </span>
                          </div>
                       </div>
                       
                       <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-sm">
                          <Quote className="w-4 h-4 fill-current" />
                       </div>
                    </div>

                    {/* Rating - Concise Star Bar */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < testi.rating
                              ? "text-orange-500 fill-orange-500"
                              : "text-gray-100 fill-gray-100"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content - Elegant Blockquote */}
                    <blockquote className="text-gray-500 font-normal leading-relaxed text-sm sm:text-base flex-grow tracking-tight italic">
                      "{testi.isi}"
                    </blockquote>
                    
                    {/* Bottom Detail */}
                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-orange-200 rounded-full" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                          Diverifikasi Oleh Admin
                        </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Premium Slider Controls */}
          {testimonies.length > visibleCount && (
            <div className="flex justify-center items-center gap-8 mt-16 lg:mt-20">
              <motion.button
                whileHover={{ x: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-black text-white hover:bg-orange-500 shadow-xl transition-all duration-500 flex items-center justify-center group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>

              {/* Progress Dots Indicator */}
              <div className="flex items-center gap-3">
                {Array.from({
                  length: Math.ceil(testimonies.length / visibleCount),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex / visibleCount ? 1 : -1);
                      setCurrentIndex(index * visibleCount);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      Math.floor(currentIndex / visibleCount) === index
                        ? "bg-orange-500 w-10 shadow-[0_4px_10px_rgba(249,115,22,0.3)]"
                        : "bg-gray-100 w-3 hover:bg-orange-200"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ x: 4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-black text-white hover:bg-orange-500 shadow-xl transition-all duration-500 flex items-center justify-center group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
