"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Toast from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal"; // ← import modal konfirmasi

export default function ProfilPage() {
  const [tim, setTim] = useState([]);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // State untuk modal konfirmasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchTim();
  }, []);

  async function fetchTim() {
    const { data, error } = await supabase.from("tim").select("*");
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
      showToast("❌ Gagal menghapus anggota. Cek console untuk detail", "error");
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const filteredTim =
    filterKategori === "Semua"
      ? tim
      : tim.filter((p) => p.kategori === filterKategori);

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10 space-y-6 relative">
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
        itemName={selectedItem?.nama || "anggota ini"}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Tim</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola anggota tim Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/profil/tambah"
          className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <FaPlus /> Tambah Anggota
        </Link>
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
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTim.map((person) => (
          <div
            key={person.id}
            className="bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md overflow-hidden relative"
          >
            <div className="relative w-full h-48">
              <img
                src={person.foto_url || "/no-avatar.png"}
                alt={person.nama}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Link
                  href={`/dashboard/profil/${person.id}`}
                  className="p-2 bg-white/90 rounded-full text-[#FB6B00] hover:text-orange-700 shadow-sm"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => {
                    setSelectedItem(person);
                    setIsModalOpen(true);
                  }}
                  className="p-2 bg-white/90 rounded-full text-red-500 hover:text-red-700 shadow-sm"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="p-5 text-center">
              <h3 className="font-semibold text-lg text-[#FB6B00] mb-1">
                {person.nama}
              </h3>
              <p className="text-gray-600 text-sm">{person.jabatan}</p>
              <p className="text-gray-500 text-xs mt-1">{person.kategori}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
