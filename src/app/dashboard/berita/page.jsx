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
      // Hapus gambar di storage jika ada
      if (imageUrl) {
        const url = new URL(imageUrl);
        const path = url.pathname.replace("/storage/v1/object/public/berita-images/", "");
        if (path) {
          const { error: storageError } = await supabase.storage
            .from("berita-images")
            .remove([path]);
          if (storageError) console.error("Gagal hapus gambar di storage:", storageError);
        }
      }

      // Hapus berita di tabel
      const { error } = await supabase.from("berita").delete().eq("id", id);
      if (error) throw error;

      // Update state
      setBerita((prev) => prev.filter((item) => item.id !== id));
      alert("✅ Berita dan gambar berhasil dihapus");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Gagal menghapus berita. Periksa RLS/permission user.");
    }
  };

  if (loading)
    return <div className="p-10 text-center text-gray-600">Memuat data...</div>;

  return (
    <section className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Berita</h1>
        <Link
          href="/dashboard/berita/tambah"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Tambah
        </Link>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Judul</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Penulis</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              berita.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{item.author || "Admin"}</td>
                  <td className="px-4 py-3 text-center">
                    {item.is_top ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Utama</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">Biasa</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <Link
                      href={`/dashboard/berita/edit/${item.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id, item.image_url)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
