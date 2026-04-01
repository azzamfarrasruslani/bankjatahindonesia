"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import Toast from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
// Import form berupa Sheet
import ProfilFormSheet from "./ProfilFormSheet";

export default function ProfilPage() {
  const [tim, setTim] = useState([]);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // State untuk modal konfirmasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // State untuk Sheet Form (Tambah / Edit)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTim();
  }, []);

  async function fetchTim() {
    const { data, error } = await supabase
      .from("tim")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Gagal memuat data tim:", error.message);
      showToast("Gagal memuat data tim", "error");
      return;
    }
    setTim(data);

    const uniqueKategori = [
      "Semua",
      ...new Set(data.map((item) => item.kategori).filter(Boolean)),
    ];
    setKategoriOptions(uniqueKategori);
  }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Fungsi hapus dipanggil dari modal
  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      const res = await fetch("/api/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          foto_url: selectedItem.foto_url,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus");

      setTim((prev) => prev.filter((item) => item.id !== selectedItem.id));
      showToast("✅ Anggota dan gambarnya berhasil dihapus", "success");
    } catch (err) {
      console.error(err);
      showToast(
        "❌ Gagal menghapus anggota. Cek console untuk detail",
        "error",
      );
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleOpenAddSheet = () => {
    setEditingId(null);
    setIsSheetOpen(true);
  };

  const handleOpenEditSheet = (id) => {
    setEditingId(id);
    setIsSheetOpen(true);
  };

  const handleSheetSuccess = () => {
    fetchTim(); // Refresh data table
  };

  const filteredTim =
    filterKategori === "Semua"
      ? tim
      : tim.filter((p) => p.kategori === filterKategori);

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10 space-y-6 relative">
      {/* Toast Notifikasi dari halaman profil */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}

      {/* Komponen Sheet (Untuk Tambah & Edit) */}
      <ProfilFormSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSuccess={handleSheetSuccess}
        timId={editingId}
      />

      {/* Modal Konfirmasi Hapus */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedItem?.nama || "anggota ini"}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Tim</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola anggota tim Bank Jatah Indonesia.
          </p>
        </div>
        <button
          onClick={handleOpenAddSheet}
          className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <FaPlus /> Tambah Anggota
        </button>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-3">
        {kategoriOptions.map((k) => (
          <button
            key={k}
            onClick={() => setFilterKategori(k)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
              filterKategori === k
                ? "bg-[#FB6B00] text-white border-[#FB6B00]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-[#FB6B00]/10"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Grid Tim */}
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTim.map((person) => (
          <div
            key={person.id}
            className="bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md overflow-hidden relative group"
          >
            <div className="relative w-full h-48 sm:h-56 bg-gray-50">
              <img
                src={person.foto_url || "/no-avatar.png"}
                alt={person.nama}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditSheet(person.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#FB6B00] hover:text-white hover:bg-[#FB6B00] shadow-sm transition-colors"
                  title="Edit Anggota"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(person);
                    setIsModalOpen(true);
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:text-white hover:bg-red-500 shadow-sm transition-colors"
                  title="Hapus Anggota"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="p-5 text-center">
              <h3 className="font-semibold text-lg text-[#FB6B00] mb-1 line-clamp-1">
                {person.nama}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-1">
                {person.jabatan}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <span
                  className={`w-2 h-2 rounded-full ${person.status ? "bg-green-500" : "bg-gray-400"}`}
                ></span>
                <p className="text-gray-500 text-xs font-medium">
                  {person.kategori}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredTim.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">
              Tidak ada anggota tim yang ditemukan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
