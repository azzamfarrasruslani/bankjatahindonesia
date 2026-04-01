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
  const autoScrollDelay = 3500;

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from("lokasi")
        .select("id, nama, alamat, gambar_url")
        .eq("jenis", "mitra")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Gagal memuat data mitra:", error.message || error);
      } else {
        const mappedData =
          data?.map((m) => ({
            ...m,
            jabatan: m.alamat,
            foto_url: m.gambar_url,
          })) || [];
        setPartners(mappedData);
      }

      setLoading(false);
    };

    fetchPartners();
  }, []);

  const displayedPartners =
    partners.length > 0 ? [...partners, ...partners] : [];

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
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-5">
            <div className="h-10 bg-gray-100 rounded-full w-64 mx-auto"></div>
            <div className="h-4 bg-gray-100 rounded-full w-96 mx-auto"></div>
            <div className="flex justify-center gap-6 mt-16 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-[200px] h-[260px] bg-gray-100 rounded-[2rem] flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="mitra"
      className="bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative border-t border-gray-50"
    >
      {/* Decorative Blur Ornaments */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
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
              Kolaborasi Kami
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            Distributor & <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Mitra Setia
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Membangun jaringan bisnis yang kuat dan saling menguntungkan.
            Bersama para mitra, kami berdedikasi menciptakan ekosistem
            pengelolaan yang berkelanjutan di berbagai daerah.
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
            <div className="bg-gray-50 rounded-[2rem] p-10 max-w-lg mx-auto border border-gray-100 shadow-sm border-dashed">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg
                  className="w-10 h-10 text-orange-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Belum Ada Data Mitra
              </h3>
              <p className="text-gray-500 font-light">
                Jaringan mitra unit bisnis eksklusif kami akan segera tampil di
                sini.
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
            {/* Elegant Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Carousel Container */}
            <div className="relative overflow-hidden py-6">
              <motion.div
                className="flex gap-6 lg:gap-8"
                ref={containerRef}
                animate={{
                  x: `-${currentIndex * (220 + 24)}px`, // accounting for width + gap
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                {displayedPartners.map((partner, idx) => (
                  <motion.div
                    key={`${partner.id}-${idx}`}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-[0_15px_40px_rgba(249,115,22,0.1)] transition-all duration-300 p-8 w-[220px] flex-shrink-0 flex flex-col items-center text-center border border-gray-100 hover:border-orange-200 cursor-pointer"
                  >
                    {/* Minimal Avatar */}
                    <div className="relative z-10 mb-6">
                      <div className="relative w-24 h-24">
                        <Image
                          src={partner.foto_url || "/images/default-avatar.png"}
                          alt={partner.nama}
                          fill
                          className="object-cover rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:ring-4 ring-orange-100 transition-all duration-300"
                        />
                        {/* Status Bubble */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white shadow-sm" />
                      </div>
                    </div>

                    {/* Partner Details */}
                    <div className="relative z-10 flex-1 flex flex-col w-full">
                      <h3 className="font-bold text-gray-900 text-base leading-tight mb-1.5 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {partner.nama}
                      </h3>

                      {partner.jabatan && (
                        <p className="text-sm text-gray-500 font-light mb-4 line-clamp-1">
                          {partner.jabatan}
                        </p>
                      )}

                      {/* Accent Divider & Badge */}
                      <div className="mt-auto flex flex-col items-center pt-2">
                        <div className="w-8 h-0.5 bg-orange-100 mb-4 group-hover:bg-orange-400 transition-colors duration-300" />
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 group-hover:bg-orange-50 rounded-full border border-gray-100 group-hover:border-orange-100 transition-colors">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                          <span className="text-xs text-gray-600 font-medium group-hover:text-orange-700">
                            Mitra
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pagination/Dots - Refined Style */}
            <div className="flex justify-center items-center gap-2.5 mt-10">
              {partners
                .slice(0, Math.ceil(partners.length / itemsPerView))
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * itemsPerView)}
                    aria-label={`Go to partner set ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      Math.floor(currentIndex / itemsPerView) === index
                        ? "bg-orange-500 w-8"
                        : "bg-gray-200 hover:bg-orange-300 w-2"
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
