"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPlus, FaTrash, FaImage } from "react-icons/fa";

export default function DashboardGaleriPage() {
  const [galeriList, setGaleriList] = useState([
    {
      id: 1,
      judul: "Kegiatan Edukasi Lingkungan",
      deskripsi: "Sosialisasi pengelolaan minyak jelantah di sekolah dasar.",
      gambar: "/images/galeri1.jpg",
      tanggal: "2025-10-01",
    },
    {
      id: 2,
      judul: "Pengumpulan Jelantah Massal",
      deskripsi: "Kegiatan pengumpulan minyak jelantah bersama masyarakat.",
      gambar: "/images/galeri2.jpg",
      tanggal: "2025-09-22",
    },
    {
      id: 3,
      judul: "Kerjasama dengan UMKM",
      deskripsi: "Penandatanganan MoU kemitraan antara Bank Jatah dan UMKM lokal.",
      gambar: "/images/galeri3.jpg",
      tanggal: "2025-09-10",
    },
  ]);

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus foto ini?")) return;
    setGaleriList((prev) => prev.filter((item) => item.id !== id));
    alert("✅ Foto galeri berhasil dihapus (dummy mode)");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Galeri</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola foto-foto kegiatan dan dokumentasi Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/galeri/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Foto
        </Link>
      </div>

      {/* Grid Galeri */}
      {galeriList.length === 0 ? (
        <p className="text-center py-10 text-gray-400 italic bg-orange-50/30 rounded-xl shadow-inner">
          Belum ada foto galeri yang tercatat.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galeriList.map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-48 w-full bg-gray-100">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.judul}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.deskripsi}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Tombol Hapus */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                title="Hapus Foto"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-10">
        © {new Date().getFullYear()} Dashboard Galeri | Bank Jatah Indonesia
      </div>
    </section>
  );
}
