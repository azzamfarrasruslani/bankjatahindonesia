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

  const itemsPerView = 5; // jumlah card terlihat
  const autoScrollDelay = 3000; // 3 detik per card

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

  // total card termasuk duplikasi untuk looping
  const displayedPartners = partners.length > 0 ? [...partners, ...partners] : [];

  useEffect(() => {
    if (partners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoScrollDelay);

    return () => clearInterval(interval);
  }, [partners]);

  // Reset posisi agar infinite loop
  useEffect(() => {
    if (currentIndex >= partners.length) {
      setTimeout(() => setCurrentIndex(0), 500); // delay sesuai durasi animasi
    }
  }, [currentIndex, partners.length]);

  if (loading) {
    return (
      <section className="bg-white py-16 text-center">
        <p className="text-gray-500 animate-pulse">Memuat data mitra...</p>
      </section>
    );
  }

  return (
    <section id="mitra" className="bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00]">
          Mitra <span className="text-black">Kami</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Bank Jatah Indonesia bekerja sama dengan berbagai mitra untuk
          mendukung pengelolaan minyak jelantah yang berkelanjutan.
        </p>
      </div>

      {partners.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          Belum ada data mitra unit bisnis yang tersedia.
        </p>
      ) : (
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            ref={containerRef}
            animate={{
              x: `-${currentIndex * (180 + 32)}px`,
            }}
            transition={{ duration: 0.5 }}
          >
            {displayedPartners.map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition duration-300 p-4 w-[180px] flex-shrink-0 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src={partner.foto_url || "/images/default-logo.png"}
                    alt={partner.nama}
                    fill
                    className="object-cover rounded-full border border-gray-200"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {partner.nama}
                </h3>
                {partner.jabatan && (
                  <p className="text-xs text-gray-500">{partner.jabatan}</p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
