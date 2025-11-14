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
          .select("nama, isi, rating, tanggal")
          .order("tanggal", { ascending: false });

        if (error) throw error;

        const withPhotos = data.map((item) => ({
          ...item,
          photo: "/images/tentang-kami.png",
        }));

        setTestimonies(withPhotos);
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
      prev === 0 ? testimonies.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => 
      prev >= testimonies.length - visibleCount ? 0 : prev + 1
    );
  };

  const visibleTestimonies = testimonies.slice(currentIndex, currentIndex + visibleCount);

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="animate-pulse rounded-2xl p-8 bg-white border border-gray-100 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
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
      <section className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Quote className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Belum Ada Testimoni
            </h3>
            <p className="text-gray-600">
              Testimoni dari masyarakat akan muncul di sini.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Kata Mereka
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Testimoni{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">
              Masyarakat
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pengalaman nyata dari masyarakat yang telah merasakan manfaat 
            program Bank Jatah Indonesia
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {visibleTestimonies.map((testi, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testi.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      {testi.rating}/5
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 line-clamp-5">
                    "{testi.isi}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testi.nama.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testi.nama}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Pengguna Bank Jatah
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {testimonies.length > visibleCount && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Testimoni sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2 mx-6">
                {Array.from({ length: Math.ceil(testimonies.length / visibleCount) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex / visibleCount ? 1 : -1);
                      setCurrentIndex(index * visibleCount);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / visibleCount) === index
                        ? "bg-primary w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Testimoni berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}