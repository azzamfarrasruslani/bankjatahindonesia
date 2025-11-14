"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function PartnerSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const itemsPerView = 5;
  const autoScrollDelay = 3000;

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from("tim")
        .select("id, nama, jabatan, foto_url, kategori, status")
        .eq("kategori", "Tim Unit Bisnis")
        .eq("status", true)
        .order("created_at", { ascending: true });

      if (error) console.error("Gagal memuat data mitra:", error);
      else setPartners(data || []);

      setLoading(false);
    };

    fetchPartners();
  }, []);

  const displayedPartners = partners.length > 0 ? [...partners, ...partners] : [];

  useEffect(() => {
    if (partners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoScrollDelay);

    return () => clearInterval(interval);
  }, [partners]);

  useEffect(() => {
    if (currentIndex >= partners.length) {
      setTimeout(() => setCurrentIndex(0), 500);
    }
  }, [currentIndex, partners.length]);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            <div className="flex justify-center gap-6 mt-12">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-32 h-40 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mitra" className="bg-gradient-to-b from-white to-gray-50/30 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
              Kolaborasi Kami
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Mitra <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-primary">Kami</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Berkolaborasi dengan berbagai mitra untuk menciptakan ekosistem 
            pengelolaan minyak jelantah yang berkelanjutan dan menguntungkan.
          </p>
        </motion.div>

        {partners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto border border-gray-200">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data Mitra</h3>
              <p className="text-gray-600 text-sm">
                Data mitra unit bisnis akan segera tersedia.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            
            {/* Carousel Container */}
            <div className="relative overflow-hidden py-4">
              <motion.div
                className="flex gap-6 lg:gap-8"
                ref={containerRef}
                animate={{
                  x: `-${currentIndex * (200 + 24)}px`,
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                {displayedPartners.map((partner, idx) => (
                  <motion.div
                    key={`${partner.id}-${idx}`}
                    whileHover={{ 
                      y: -8,
                      scale: 1.05 
                    }}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 w-[200px] flex-shrink-0 flex flex-col items-center text-center border border-gray-100"
                  >
                    {/* Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
                    
                    {/* Avatar */}
                    <div className="relative z-10 mb-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={partner.foto_url || "/images/default-avatar.png"}
                          alt={partner.nama}
                          fill
                          className="object-cover rounded-full border-2 border-white shadow-lg group-hover:border-primary/20 transition-colors duration-300"
                        />
                        {/* Online Indicator */}
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 group-hover:text-gray-800 transition-colors">
                        {partner.nama}
                      </h3>
                      {partner.jabatan && (
                        <p className="text-xs text-primary font-medium mb-2">
                          {partner.jabatan}
                        </p>
                      )}
                      
                      {/* Badge */}
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-xs text-gray-600 font-medium">Mitra</span>
                      </div>
                    </div>

                    {/* Hover Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-500" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {partners.slice(0, Math.ceil(partners.length / itemsPerView)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerView) === index 
                      ? "bg-primary w-6" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}