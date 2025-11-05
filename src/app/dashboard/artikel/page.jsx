"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function ArtikelPage() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtikel = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("artikel")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil artikel:", error);
      setArtikel([]);
    } else {
      setArtikel(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const handleDelete = async (id, gambar_url) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
      const res = await fetch("/api/artikel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, gambar_url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus artikel");

      setArtikel((prev) => prev.filter((item) => item.id !== id));
      alert("✅ Artikel dan gambarnya berhasil dihapus");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menghapus artikel. Cek console untuk detail.");
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-orange-200 pb-4 gap-3 md:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Artikel
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar artikel, ubah, atau hapus dengan mudah.
          </p>
        </div>
        <Link
          href="/dashboard/artikel/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Artikel
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md border border-orange-100 bg-white">
        <table className="min-w-max w-full text-sm table-auto border-collapse">
          <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left w-[250px]">Judul</th>
              <th className="px-6 py-3 text-left w-[120px]">Kategori</th>
              <th className="px-6 py-3 text-left w-[120px]">Penulis</th>
              <th className="px-6 py-3 text-left w-[80px]">Views</th>
              <th className="px-6 py-3 text-center w-[100px]">Status</th>
              <th className="px-6 py-3 text-left w-[120px]">Tanggal</th>
              <th className="px-6 py-3 text-center w-[120px]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500 italic"
                >
                  Memuat artikel...
                </td>
              </tr>
            ) : artikel.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400 italic bg-orange-50/30"
                >
                  Belum ada artikel yang tercatat.
                </td>
              </tr>
            ) : (
              artikel.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-orange-100 transition-all duration-200 ${
                    index % 2 === 0
                      ? "bg-white hover:bg-orange-50/60"
                      : "bg-orange-50/40 hover:bg-orange-100/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                    {item.gambar_url && (
                      <img
                        src={item.gambar_url}
                        alt="Thumbnail"
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <span
                      title={item.judul}
                      className="truncate max-w-[200px] block"
                    >
                      {item.judul}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.kategori || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.penulis || "Admin"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.views || 0}</td>
                  <td className="px-6 py-4 text-center">
                    {item.is_top ? (
                      <span className="bg-[#FB6B00]/20 text-[#FB6B00] px-3 py-1 rounded-full text-xs font-semibold">
                        Utama
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        Biasa
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/dashboard/artikel/${item.id}`}
                        className="p-2 rounded-full text-[#FB6B00] hover:text-orange-700 ransition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.gambar_url)}
                        className="p-2 rounded-full text-red-500 hover:text-red-700 transition-all"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard Artikel | Bank Jatah Indonesia
      </div>
    </section>
  );
}
