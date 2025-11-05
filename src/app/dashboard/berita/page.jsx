"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import Toast from "@/components/common/Toast";

export default function DashboardBeritaPage() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Fetch data berita
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
        showToast("Gagal memuat data berita", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Buka modal konfirmasi hapus
  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Aksi hapus
  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    const { id, gambar_url } = selectedItem;
    setDeletingId(id);

    try {
      const res = await fetch("/api/berita", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, gambar_url }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menghapus berita");

      setBerita((prev) => prev.filter((item) => item.id !== id));
      showToast("✅ Berita berhasil dihapus", "success");
    } catch (err) {
      console.error("❌ Error saat hapus berita:", err);
      showToast("❌ Gagal menghapus berita", "error");
    } finally {
      setShowModal(false);
      setDeletingId(null);
      setSelectedItem(null);
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Berita</h1>
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

      {/* Tabel Berita */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-orange-100 bg-white">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left w-[300px]">Judul</th>
              <th className="px-6 py-3 text-left w-[120px]">Tanggal</th>
              <th className="px-6 py-3 text-left w-[120px]">Penulis</th>
              <th className="px-6 py-3 text-center w-[100px]">Status</th>
              <th className="px-6 py-3 text-center w-[120px]">Aksi</th>
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
                  {/* Judul + Thumbnail */}
                  <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                    {item.gambar_url ? (
                      <img
                        src={item.gambar_url}
                        alt="Thumbnail"
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                        No Img
                      </div>
                    )}
                    <span className="truncate max-w-[200px]" title={item.judul}>
                      {item.judul}
                    </span>
                  </td>

                  {/* Tanggal */}
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>

                  {/* Penulis */}
                  <td className="px-6 py-4 text-gray-600">
                    {item.penulis || "Admin"}
                  </td>

                  {/* Status */}
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

                  {/* Aksi */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/dashboard/berita/${item.id}`}
                        className="p-2 rounded-full hover:bg-orange-100 text-[#FB6B00] hover:text-orange-700 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className={`p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-all ${
                          deletingId === item.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        title="Hapus"
                        disabled={deletingId === item.id}
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

      {/* Modal Konfirmasi Hapus */}
      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Berita"
        message={`Apakah Anda yakin ingin menghapus berita "${selectedItem?.judul}"?`}
      />

      {/* Footer Info */}
      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard Berita | Bank Jatah Indonesia
      </div>
    </section>
  );
}
