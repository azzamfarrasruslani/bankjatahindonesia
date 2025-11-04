"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function PartnerSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from("tim")
        .select("id, nama, jabatan, foto_url, kategori, status")
        .eq("kategori", "Tim Unit Bisnis")
        .eq("status", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Gagal memuat data mitra:", error);
      } else {
        setPartners(data || []);
      }
      setLoading(false);
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16 text-center">
        <p className="text-gray-500 animate-pulse">Memuat data mitra...</p>
      </section>
    );
  }

  return (
    <section id="mitra" className="bg-white py-16 px-6 sm:px-12 lg:px-24">
      {/* Judul */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FB6B00]">
          Mitra <span className="text-black">Kami</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Bank Jatah Indonesia bekerja sama dengan berbagai mitra untuk
          mendukung pengelolaan minyak jelantah yang berkelanjutan.
        </p>
      </div>

      {/* Grid Card Mitra */}
      {partners.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          Belum ada data mitra unit bisnis yang tersedia.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition duration-300 p-4 w-full max-w-[180px] flex flex-col items-center text-center"
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
      )}
    </section>
  );
}
