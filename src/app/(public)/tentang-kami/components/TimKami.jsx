"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function TimKami() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from("tim")
          .select("id, nama, jabatan, foto_url")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error("Gagal memuat data tim:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium animate-pulse">
            Memuat susunan manajemen tim...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent opacity-80 pointer-events-none" />

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
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              Susunan Pengurus
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            Tim di Balik <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Bank Jatah
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Bertemu dengan para profesional yang berdedikasi mengubah limbah
            menjadi solusi berkelanjutan melalui tekad eksekusi tanpa henti.
          </p>
        </motion.div>

        {/* State Kosong */}
        {teamMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-[2.5rem] p-16 max-w-lg mx-auto border border-gray-100 shadow-sm border-dashed text-center"
          >
            <div className="w-24 h-24 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-orange-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Belum Ada Data Tim
            </h3>
            <p className="text-gray-500 font-light">
              Daftar pengurus inti Bank Jatah Indonesia akan segera
              dipublikasikan.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] border border-gray-100 hover:border-orange-200 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
                  <Image
                    src={member.foto_url || "/images/default-avatar.png"}
                    alt={member.nama}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-md rounded-full shadow-lg group-hover:bg-orange-500 transition-colors duration-300 text-gray-400 group-hover:text-white border border-gray-100 group-hover:border-transparent transform group-hover:rotate-45">
                    <ArrowRight size={18} className="transition-transform" />
                  </div>

                  {/* Name Overlay Info (Visible on Hover in Desktop, always on mobile) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 content-none">
                      Eksekutif
                    </span>
                  </div>
                </div>

                {/* Info Panel under image */}
                <div className="p-6 bg-white relative z-10 flex-grow flex flex-col justify-center text-center group-hover:bg-orange-50/30 transition-colors duration-500 border-t border-gray-100">
                  <div className="w-12 h-1 bg-gray-200 mx-auto rounded-full mb-4 group-hover:bg-orange-400 transition-colors" />
                  <h4 className="text-xl font-bold text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {member.nama}
                  </h4>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest line-clamp-1">
                    {member.jabatan}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
