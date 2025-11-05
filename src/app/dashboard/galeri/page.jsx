"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function DashboardGaleriPage() {
  const router = useRouter();
  const [galeriList, setGaleriList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGaleri = async () => {
    try {
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) throw error;
      setGaleriList(data || []);
    } catch (err) {
      console.error("Gagal mengambil data galeri:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, gambar_url) => {
    if (!confirm("Yakin ingin menghapus foto ini beserta gambarnya?")) return;

    try {
      // Hapus gambar di storage jika ada
      if (gambar_url) {
        const filePath = gambar_url.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/galeri-images/galeri/`,
          ""
        );
        const { error: storageError } = await supabase.storage
          .from("galeri-images")
          .remove([filePath]);
        if (storageError)
          console.error("Gagal menghapus gambar galeri:", storageError);
      }

      // Hapus record galeri
      const { error } = await supabase.from("galeri").delete().eq("id", id);
      if (error) throw error;

      // Update state UI
      fetchGaleri(); // fungsi untuk refresh state galeri
    } catch (err) {
      alert("Gagal menghapus foto. Cek console.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Memuat data...</p>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      <div className="flex items-center justify-between mb-10 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Galeri
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola foto kegiatan dan dokumentasi Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/galeri/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm"
        >
          <FaPlus /> Tambah Foto
        </Link>
      </div>

      {galeriList.length === 0 ? (
        <p className="text-center py-10 text-gray-400 italic bg-orange-50/30 rounded-xl">
          Belum ada foto galeri yang tercatat.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galeriList.map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              {/* Tombol Aksi */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => router.push(`/dashboard/galeri/${item.id}`)}
                  className="p-2 bg-orange-50 hover:bg-orange-100 text-[#FB6B00] rounded-full shadow-sm transition-all"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full shadow-sm transition-all"
                  title="Hapus"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Konten Galeri */}
              <img
                src={item.gambar_url}
                alt={item.judul}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.judul}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.deskripsi}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
