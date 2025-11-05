"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal"; // ← modal konfirmasi
import Toast from "@/components/common/Toast";

export default function LokasiPage() {
  const [activeTab, setActiveTab] = useState("utama");
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Toast
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("lokasi")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLokasi(data || []);
    } catch (err) {
      console.error("Fetch lokasi error:", err);
      showToast("❌ Gagal memuat data lokasi", "error");
    } finally {
      setLoading(false);
    }
  }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      // Hapus gambar di storage jika ada
      if (selectedItem.gambar_url) {
        const filePath = selectedItem.gambar_url.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lokasi-images/lokasi/`,
          ""
        );
        const { error: storageError } = await supabase.storage
          .from("lokasi-images")
          .remove([filePath]);
        if (storageError) console.error("Gagal menghapus gambar:", storageError);
      }

      // Hapus record lokasi
      const { error } = await supabase.from("lokasi").delete().eq("id", selectedItem.id);
      if (error) throw error;

      // Update state UI
      setLokasi((prev) => prev.filter((item) => item.id !== selectedItem.id));
      showToast("✅ Lokasi berhasil dihapus", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Gagal menghapus lokasi. Cek console.", "error");
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const lokasiUtama = lokasi.filter((l) => l.jenis === "utama");
  const lokasiMitra = lokasi.filter((l) => l.jenis === "mitra");

  const renderTable = (data) => {
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
      <div className="overflow-hidden rounded-xl shadow-md border border-orange-100 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Jenis</th>
              <th className="px-6 py-3 text-left">Alamat</th>
              <th className="px-6 py-3 text-left">Deskripsi</th>
              <th className="px-6 py-3 text-left">Kontak</th>
              <th className="px-6 py-3 text-left">Jam Operasional</th>
              <th className="px-6 py-3 text-center">Gambar</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-orange-100 transition-all duration-200 ${
                  index % 2 === 0
                    ? "bg-white hover:bg-orange-50/60"
                    : "bg-orange-50/40 hover:bg-orange-100/50"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">{item.nama}</td>
                <td className="px-6 py-4 capitalize text-gray-600">{item.jenis}</td>
                <td className="px-6 py-4 text-gray-700">{item.alamat || "-"}</td>
                <td className="px-6 py-4 text-gray-700">{item.deskripsi ? item.deskripsi.slice(0, 60) + "..." : "-"}</td>
                <td className="px-6 py-4 text-gray-700">{item.kontak || "-"}</td>
                <td className="px-6 py-4 text-gray-700">{item.jam_operasional || "-"}</td>
                <td className="px-6 py-4 text-center">
                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt={item.nama}
                      className="w-16 h-16 object-cover rounded-md mx-auto border border-orange-200"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Tidak ada</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-5">
                    <Link
                      href={`/dashboard/lokasi/${item.id}`}
                      className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 hover:text-yellow-800 transition-all"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600 hover:text-red-800 transition-all"
                      title="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md relative">
      {/* Toast */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}

      {/* Modal Konfirmasi Hapus */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.nama || "lokasi ini"}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Lokasi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola lokasi utama dan mitra Bank Jatah Indonesia dengan mudah.
          </p>
        </div>
        <Link
          href="/dashboard/lokasi/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Lokasi
        </Link>
      </div>

      {/* Tabs */}
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

      {/* Table */}
      {activeTab === "utama" && renderTable(lokasiUtama)}
      {activeTab === "mitra" && renderTable(lokasiMitra)}

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard Lokasi | Bank Jatah Indonesia
      </div>
    </section>
  );
}
