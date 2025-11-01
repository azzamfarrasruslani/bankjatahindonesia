"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function LokasiPage() {
  const [activeTab, setActiveTab] = useState("utama");
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("lokasi")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setLokasi(data || []);
      } catch (err) {
        console.error("Fetch lokasi error:", err);
        alert("Gagal memuat data lokasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, gambar_url) => {
    if (!confirm("Yakin ingin menghapus lokasi ini beserta gambarnya?")) return;

    try {
      // Hapus file di storage jika ada
      if (gambar_url) {
        try {
          const url = new URL(gambar_url);
          const path = url.pathname.replace("/storage/v1/object/public/lokasi-images/", "");
          if (path) {
            const { error: storageError } = await supabase.storage
              .from("lokaSI-images") // intentional fallback if typo; will try correct next
              .remove([path]);
            // jika gagal pada nama bucket yang salah, ulangi dengan nama benar
            if (storageError) {
              await supabase.storage.from("lokasi-images").remove([path]);
            }
          }
        } catch (e) {
          // jika gambar_url bukan URL lengkap (misal relative path), coba hapus berdasarkan nama file
          console.warn("Tidak bisa parsing gambar_url untuk penghapusan storage:", e);
        }
      }

      const { error } = await supabase.from("lokasi").delete().eq("id", id);
      if (error) throw error;

      setLokasi((prev) => prev.filter((item) => item.id !== id));
      alert("✅ Lokasi berhasil dihapus");
    } catch (err) {
      console.error("Delete lokasi error:", err);
      alert("❌ Gagal menghapus lokasi. Periksa permission dan koneksi.");
    }
  };

  const lokasiUtama = lokasi.filter((l) => l.jenis === "utama");
  const lokasiMitra = lokasi.filter((l) => l.jenis === "mitra");

  const renderGallery = (data) => {
    if (loading) {
      return (
        <div className="text-center py-10 text-orange-600 font-medium animate-pulse">
          Memuat data lokasi...
        </div>
      );
    }
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-10 text-gray-400 italic bg-orange-50/30 rounded-lg">
          Belum ada lokasi pada kategori ini.
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={item.gambar_url || "/placeholder.jpg"}
              alt={item.nama}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{item.nama}</h3>
              <p className="text-xs text-gray-500 capitalize">{item.jenis}</p>
              {item.alamat && <p className="text-sm text-gray-600 mt-2">{item.alamat}</p>}
            </div>
            <div className="flex justify-between items-center px-4 pb-4">
              <Link
                href={`/dashboard/lokasi/${item.id}`}
                className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium transition"
              >
                <FaEdit /> Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id, item.gambar_url)}
                className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm font-medium transition"
              >
                <FaTrash /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Lokasi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola lokasi utama dan mitra Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/lokasi/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Lokasi
        </Link>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("utama")}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            activeTab === "utama" ? "bg-[#FB6B00] text-white shadow" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Lokasi Utama
        </button>
        <button
          onClick={() => setActiveTab("mitra")}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            activeTab === "mitra" ? "bg-[#FB6B00] text-white shadow" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Lokasi Mitra
        </button>
      </div>

      {activeTab === "utama" && renderGallery(lokasiUtama)}
      {activeTab === "mitra" && renderGallery(lokasiMitra)}

      <div className="text-xs text-gray-400 text-center mt-10">© {new Date().getFullYear()} Dashboard Lokasi | Bank Jatah Indonesia</div>
    </section>
  );
}
