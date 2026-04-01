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
    <section className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-gray-50">
      {/* Background Ornament */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-orange-50/80 via-transparent to-transparent opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-orange-200 bg-orange-50 rounded-full mb-6 mx-auto shadow-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              Kata Mereka
            </span>
          </div>

          {/* Title - Light Theme High Contrast */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            Testimoni <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Masyarakat
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Pengalaman nyata inspiratif dari masyarakat yang telah merasakan
            langsung manfaat bergabung dalam ekosistem Bank Jatah Indonesia.
          </p>
        </motion.div>

        {/* Testimonials Grid/Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {visibleTestimonies.map((testi, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] border border-gray-100 hover:border-orange-200 transition-all duration-500 cursor-pointer flex flex-col h-full"
                >
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: User Info & Quote Icon */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        {/* Elegant Initial Avatar */}
                        <div className="w-14 h-14 bg-gray-50 group-hover:bg-orange-500 rounded-full flex items-center justify-center text-gray-600 group-hover:text-white font-bold text-xl transition-colors duration-300 shadow-sm border border-gray-100 group-hover:border-orange-400">
                          {testi.nama.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-orange-600 transition-colors">
                            {testi.nama}
                          </h4>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Pengguna
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-200 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Quote className="w-5 h-5 fill-current" />
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testi.rating
                              ? "text-orange-400 fill-orange-400"
                              : "text-gray-200 fill-gray-200"
                          } transition-colors`}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-600 leading-relaxed font-light text-base sm:text-lg mb-6 flex-grow">
                      "{testi.isi}"
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Premium Navigation Controls */}
          {testimonies.length > visibleCount && (
            <div className="flex justify-center items-center gap-6 mt-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-white border border-gray-100 text-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.2)] hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Testimoni sebelumnya"
              >
                <ChevronLeft className="w-6 h-6 ml-[-2px]" />
              </motion.button>

              {/* Minimal Dots Indicator */}
              <div className="flex items-center gap-2.5">
                {Array.from({
                  length: Math.ceil(testimonies.length / visibleCount),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(
                        index > currentIndex / visibleCount ? 1 : -1,
                      );
                      setCurrentIndex(index * visibleCount);
                    }}
                    aria-label={`Go to set ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                      Math.floor(currentIndex / visibleCount) === index
                        ? "bg-orange-500 w-8"
                        : "bg-gray-200 hover:bg-orange-300 w-2"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-white border border-gray-100 text-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.2)] hover:bg-orange-500 hover:border-orange-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Testimoni berikutnya"
              >
                <ChevronRight className="w-6 h-6 mr-[-2px]" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
