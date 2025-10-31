"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";

export default function DashboardTestimoniPage() {
  const [testimoniList, setTestimoniList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimoni dari Supabase
  const fetchTestimoni = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimoni")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error("Fetch error:", error);
    else setTestimoniList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  // Delete testimoni
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    const { error } = await supabase.from("testimoni").delete().eq("id", id);
    if (error) alert("Error: " + error.message);
    else {
      alert("✅ Testimoni berhasil dihapus");
      fetchTestimoni();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Testimoni
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola testimoni pengguna tentang Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/testimoni/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Testimoni
        </Link>
      </div>

      {/* Grid Testimoni */}
      {testimoniList.length === 0 ? (
        <p className="text-center py-10 text-gray-400 italic bg-orange-50/30 rounded-xl shadow-inner">
          Belum ada testimoni yang tercatat.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimoniList.map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-orange-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item.nama}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/testimoni/edit/${item.id}`}
                    className="p-2 rounded-full hover:bg-orange-100 text-[#FB6B00] hover:text-orange-700 transition-all"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Isi Testimoni */}
              <p className="text-gray-700 leading-relaxed text-sm italic mb-2">
                “{item.isi}”
              </p>

              {/* Footer Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FB6B00] to-orange-400 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-10">
        © {new Date().getFullYear()} Dashboard Testimoni | Bank Jatah Indonesia
      </div>
    </section>
  );
}
