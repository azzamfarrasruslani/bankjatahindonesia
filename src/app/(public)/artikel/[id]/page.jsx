"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import parse from "html-react-parser";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, User, Share2 } from "lucide-react";
import Link from "next/link";

export default function ArtikelDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchArtikel = async () => {
      try {
        if (typeof id !== "string" || id.length !== 36) {
          setErrorMsg("Tautan artikel tidak valid.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("artikel")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setArtikel(data);

        // Optional: Update Views (can be done silently or via backend RPC)
        if (data) {
          supabase.rpc("increment_artikel_views", { row_id: id }).then();
        }
      } catch (err) {
        console.error("Gagal memuat artikel:", err.message);
        setErrorMsg("Halaman artikel yang Anda cari tidak dapat ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-8 w-32 bg-gray-100 rounded-full animate-pulse mb-10" />
          <div className="space-y-4 mb-8">
            <div className="h-12 lg:h-14 w-full bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-12 lg:h-14 w-3/4 bg-gray-100 rounded-2xl animate-pulse" />
          </div>
          <div className="flex gap-4 mb-10">
            <div className="h-6 w-24 bg-orange-50 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="w-full aspect-video bg-gray-100 rounded-[2rem] animate-pulse mb-12 shimmer-bg" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-50 rounded-full animate-pulse" />
            <div className="h-4 w-full bg-gray-50 rounded-full animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-50 rounded-full animate-pulse" />
            <div className="h-4 w-4/6 bg-gray-50 rounded-full animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (errorMsg || !artikel) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-[2.5rem] p-12 max-w-lg w-full text-center shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📭</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">Oops!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {errorMsg ||
              "Artikel yang Anda cari mungkin telah dihapus atau tautannya rusak."}
          </p>
          <button
            onClick={() => router.push("/artikel")}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-full transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Artikel
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = artikel.created_at
    ? new Date(artikel.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Article Hero Banner */}
      <div className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gray-900 overflow-hidden flex items-center">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          {artikel.gambar_url ? (
            <Image
              src={artikel.gambar_url}
              alt="Background"
              fill
              className="object-cover opacity-30 select-none pointer-events-none"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
          )}
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent opacity-80" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          {/* Back Navigation */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 mb-8 sm:mb-12 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </motion.button>

          {/* Title Category & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {artikel.kategori && (
              <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-md text-[10px] font-black uppercase tracking-widest shadow-md mb-6">
                {artikel.kategori}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight drop-shadow-xl mb-8">
              {artikel.judul}
            </h1>
          </motion.div>

          {/* Author & Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-300 text-sm font-medium"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-600 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Penulis
                </span>
                <span className="text-white font-bold">
                  {artikel.penulis || "Redaksi BJI"}
                </span>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-orange-400" />
              <span>{artikel.views} Terbaca</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <article className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 -mt-10 lg:-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100"
        >
          {/* Rich Text Prose Content */}
          <div
            className="prose prose-lg max-w-none text-gray-800
              prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-normal
              prose-a:text-orange-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-[1.5rem] prose-img:shadow-md
              prose-strong:font-bold prose-strong:text-gray-900
              prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-gray-800 prose-blockquote:font-medium prose-blockquote:not-italic
              prose-li:text-gray-700
            "
          >
            {parse(
              artikel.isi ||
                "<p className='text-center italic text-gray-500'>Tidak ada konten artikel.</p>",
            )}
          </div>

          {/* Content Footer / Share */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-semibold border border-gray-100">
                #EdukasiJelantah
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-semibold border border-gray-100">
                #BankJatahIndonesia
              </span>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: artikel.judul,
                    text: "Baca artikel menarik ini dari Bank Jatah Indonesia!",
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Tautan disalin ke clipboard!");
                }
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-600 bg-white border border-gray-200 hover:border-orange-200 px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              Bagikan Artikel
            </button>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
