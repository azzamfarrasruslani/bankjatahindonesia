"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Ambil data program dari Supabase
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from("program")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPrograms(data || []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        alert("Gagal memuat data program.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Hapus program
  const handleDelete = async (id, icon_url) => {
    if (!confirm("🗑️ Yakin ingin menghapus program ini?")) return;

    try {
      setDeletingId(id);

      const res = await fetch("/api/program", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, icon_url }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menghapus program");

      setPrograms((prev) => prev.filter((item) => item.id !== id));
      alert("✅ Program berhasil dihapus!");
    } catch (err) {
      console.error("❌ Error saat hapus program:", err);
      alert("❌ Gagal menghapus program. Cek console untuk detail.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Program</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar program, ubah, atau hapus dengan mudah.
          </p>
        </div>
        <Link
          href="/dashboard/program/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Program
        </Link>
      </div>

      {/* Card Grid */}
      {loading ? (
        <div className="text-center text-orange-600 font-medium animate-pulse py-16">
          Memuat data program...
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center text-gray-400 italic bg-orange-50/40 py-16 rounded-xl">
          Belum ada program yang tercatat.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 overflow-hidden group"
            >
              {/* Gambar/Icon */}
              <div className="relative">
                {item.icon_url ? (
                  <img
                    src={item.icon_url}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-orange-50 text-gray-400 text-sm">
                    Tidak ada ikon
                  </div>
                )}
              </div>

              {/* Isi Card */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Program Aktif"
                      ? "bg-[#FB6B00]/20 text-[#FB6B00]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>

                {/* Deskripsi */}
                {item.description && (
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {item.description}
                  </p>
                )}

                {/* Button Label */}
                {item.button_label && (
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Tombol: “{item.button_label}”
                  </p>
                )}

                {/* Tombol Aksi */}
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/dashboard/program/${item.id}`}
                    className="flex items-center gap-1 text-[#FB6B00] hover:text-orange-700 text-sm font-medium transition-all"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.icon_url)}
                    className={`flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition-all ${
                      deletingId === item.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={deletingId === item.id}
                  >
                    <FaTrash /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-10">
        © {new Date().getFullYear()} Dashboard Program | Bank Jatah Indonesia
      </div>
    </section>
  );
}
