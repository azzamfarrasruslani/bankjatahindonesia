"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardBeritaPage() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBerita(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Gagal memuat data berita.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    if (!confirm("Yakin ingin menghapus berita ini beserta gambarnya?")) return;

    try {
      if (imageUrl) {
        const url = new URL(imageUrl);
        const path = url.pathname.replace(
          "/storage/v1/object/public/berita-images/",
          ""
        );
        if (path) {
          const { error: storageError } = await supabase.storage
            .from("berita-images")
            .remove([path]);
          if (storageError)
            console.error("Gagal hapus gambar di storage:", storageError);
        }
      }

      const { error } = await supabase.from("berita").delete().eq("id", id);
      if (error) throw error;

      setBerita((prev) => prev.filter((item) => item.id !== id));
      alert("✅ Berita dan gambar berhasil dihapus");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Gagal menghapus berita. Periksa RLS/permission user.");
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Berita
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar berita, ubah, atau hapus dengan mudah.
          </p>
        </div>
        <Link
          href="/dashboard/berita/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Berita
        </Link>
      </div>

      {/* Container Tabel */}
      <div className="overflow-hidden rounded-xl shadow-md border border-orange-100 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Judul</th>
              <th className="px-6 py-3 text-left">Tanggal</th>
              <th className="px-6 py-3 text-left">Penulis</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-orange-600 font-medium animate-pulse"
                >
                  Memuat data berita...
                </td>
              </tr>
            ) : berita.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400 italic bg-orange-50/30"
                >
                  Belum ada berita yang tercatat.
                </td>
              </tr>
            ) : (
              berita.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-orange-100 transition-all duration-200 ${
                    index % 2 === 0
                      ? "bg-white hover:bg-orange-50/60"
                      : "bg-orange-50/40 hover:bg-orange-100/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.judul}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.author || "Admin"}
                  </td>
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
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-5">
                      <Link
                        href={`/dashboard/berita/${item.id}`}
                        className="p-2 rounded-full hover:bg-orange-100 text-[#FB6B00] hover:text-orange-700 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.image_url)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                        title="Hapus"
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

      {/* Footer Info */}
      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard Berita | Bank Jatah Indonesia
      </div>
    </section>
  );
}
