"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import parse from "html-react-parser";

export default function DetailBeritaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBerita = async () => {
      try {
        if (typeof id !== "string" || id.length !== 36) {
          setErrorMsg("ID tidak valid.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setBerita(data);
      } catch (err) {
        console.error("Gagal memuat berita:", err.message);
        setErrorMsg("Gagal memuat berita.");
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  if (loading)
    return (
      <article className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-6 sm:px-12 lg:px-32 text-gray-800 rounded-2xl space-y-6 animate-pulse">
        {/* Tombol Back Skeleton */}
        <div className="h-6 mt-20  w-36 bg-gray-300 rounded-md"></div>

        {/* Judul Skeleton */}
        <div className="h-10 md:h-12 w-3/4 bg-gray-300 rounded-md"></div>

        {/* Info Skeleton */}
        <div className="flex space-x-4 text-sm">
          <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-4 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
        </div>

        {/* Gambar Skeleton */}
        <div className="relative w-full h-80 bg-gray-300 rounded-xl"></div>

        {/* Konten Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-4/6 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
        </div>
      </article>
    );

  if (errorMsg)
    return <div className="text-center text-red-500 py-20">{errorMsg}</div>;

  if (!berita)
    return (
      <div className="text-center text-gray-600 py-20">
        Berita tidak ditemukan.
      </div>
    );

  return (
    <article className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-6 sm:px-12 lg:px-32 text-gray-800 rounded-2xl">
      <button
        onClick={() => router.back()}
        className="mb-6 mt-20 text-[#FB6B00] hover:underline font-medium"
      >
        ← Kembali ke daftar berita
      </button>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-snug">
        {berita.judul}
      </h1>

      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
        <span>{new Date(berita.created_at).toLocaleDateString("id-ID")}</span>
        <span>•</span>
        <span>{berita.penulis || "Admin"}</span>
      </div>

      {berita.gambar_url && (
        <div className="relative w-full h-80 mb-8">
          <Image
            src={berita.gambar_url}
            alt={berita.judul}
            fill
            className="object-cover rounded-xl shadow-md"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {parse(berita.isi || "<p>Tidak ada konten.</p>")}
      </div>
    </article>
  );
}
