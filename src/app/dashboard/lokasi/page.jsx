"use client";
import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function GaleriPage() {
  const [activeTab, setActiveTab] = useState("utama");

  const galeriUtama = [
    { id: 1, title: "Lokasi Utama 1", image: "/images/utama1.jpg" },
    { id: 2, title: "Lokasi Utama 2", image: "/images/utama2.jpg" },
  ];

  const galeriMitra = [
    { id: 1, title: "Mitra A", image: "/images/mitraA.jpg" },
    { id: 2, title: "Mitra B", image: "/images/mitraB.jpg" },
  ];

  const renderGallery = (data) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
          </div>
          <div className="flex justify-between items-center px-4 pb-4">
            <button className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium transition">
              <FaEdit /> Edit
            </button>
            <button className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm font-medium transition">
              <FaTrash /> Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Galeri
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola galeri foto lokasi utama dan mitra Bank Jatah Indonesia.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200">
          <FaPlus /> Tambah Foto
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("utama")}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            activeTab === "utama"
              ? "bg-[#FB6B00] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Lokasi Utama
        </button>
        <button
          onClick={() => setActiveTab("mitra")}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            activeTab === "mitra"
              ? "bg-[#FB6B00] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Lokasi Mitra
        </button>
      </div>

      {/* Gallery Content */}
      {activeTab === "utama" && renderGallery(galeriUtama)}
      {activeTab === "mitra" && renderGallery(galeriMitra)}

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-10">
        © {new Date().getFullYear()} Dashboard Galeri | Bank Jatah Indonesia
      </div>
    </section>
  );
}
