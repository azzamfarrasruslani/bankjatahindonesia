"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaUsers, FaLeaf, FaIndustry, FaHotel, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function DashboardTentangKamiPage() {
  const [data, setData] = useState({
    sejarah: {
      judul: "Sejarah, Visi & Misi Bank Jatah",
      isi1:
        "Bank Jatah berawal dari dampak Pandemi Covid-19 pada tahun 2021 yang menyebabkan banyak usaha mengalami kerugian. Melalui inisiatif pemuda Karang Taruna, lahirlah ide untuk menciptakan peluang usaha sekaligus mengedukasi masyarakat tentang pentingnya pengelolaan limbah jelantah.",
      isi2:
        "Tepat pada 28 Agustus 2021, Bank Jatah resmi diluncurkan sebagai gerakan sosial-lingkungan yang mengubah limbah jelantah menjadi nilai ekonomi dan sosial.",
    },
    statistik: [
      { label: "Happy Clients", value: "25k+" },
      { label: "Average Rating", value: "4.5+" },
      { label: "Completed Projects", value: "330+" },
      { label: "Awards Achieved", value: "16+" },
    ],
    program: [
      {
        title: "Tabungan Jelantah",
        desc: "Menabung minyak jelantah mulai 1 kg, bisa dijadikan E-Wallet. Tersedia Point Reward & Affiliate Marketing.",
      },
      {
        title: "Jual Beli Jelantah",
        desc: "Transaksi jual-beli minyak jelantah dengan proses mudah dan harga kompetitif di seluruh cabang Bank Jatah.",
      },
      {
        title: "Sedekah Jelantah",
        desc: "Hasil penjualan minyak jelantah disalurkan ke lembaga, rumah ibadah, dan masyarakat kurang mampu.",
      },
    ],
    targetPasar: [
      {
        icon: <FaIndustry className="text-2xl text-[#FB6B00]" />,
        title: "Industri Makanan",
        desc: "714.296,6 KL jelantah dihasilkan setiap tahun, menjadi potensi besar untuk daur ulang.",
      },
      {
        icon: <FaHotel className="text-2xl text-[#FB6B00]" />,
        title: "Hotel, Restoran & Kafe",
        desc: "218.871,7 KL berasal dari sektor hospitality, potensial jadi mitra program jelantah.",
      },
      {
        icon: <FaHome className="text-2xl text-[#FB6B00]" />,
        title: "UMKM & Rumah Tangga",
        desc: "Sumber utama minyak jelantah, berperan penting dalam program tabungan dan edukasi lingkungan.",
      },
    ],
    tim: [
      { nama: "MHD. Adriyo Habibi", jabatan: "Direktur Utama" },
      { nama: "Zainal Abidin", jabatan: "Direktur Kemitraan & Pemasaran" },
      { nama: "Sukiswanto", jabatan: "Direktur Operasional" },
    ],
  });

  const handleEdit = (section) => alert(`✏️ Edit data pada bagian: ${section} (dummy mode)`);
  const handleDelete = (section, index) =>
    confirm("Yakin ingin menghapus data ini?") &&
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10 space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Tentang Kami</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola informasi profil, sejarah, program, dan tim Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/tentang/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Data
        </Link>
      </div>

      {/* Sejarah */}
      <div className="bg-white rounded-2xl p-6 shadow-md relative">
        <button
          onClick={() => handleEdit("Sejarah")}
          className="absolute top-4 right-4 text-[#FB6B00] hover:text-orange-700"
        >
          <FaEdit />
        </button>
        <h2 className="text-2xl font-semibold text-[#FB6B00] mb-3">
          {data.sejarah.judul}
        </h2>
        <p className="text-gray-700 leading-relaxed">{data.sejarah.isi1}</p>
        <p className="mt-3 text-gray-700 leading-relaxed">{data.sejarah.isi2}</p>
      </div>

      {/* Statistik */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-[#FB6B00]">Statistik & Pencapaian</h2>
          <button
            onClick={() => handleEdit("Statistik")}
            className="text-[#FB6B00] hover:text-orange-700"
          >
            <FaEdit />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.statistik.map((item, i) => (
            <div
              key={i}
              className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100 relative"
            >
              <p className="text-3xl font-bold text-[#FB6B00]">{item.value}</p>
              <p className="text-gray-600 text-sm">{item.label}</p>
              <button
                onClick={() => handleDelete("statistik", i)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Program Utama */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-[#FB6B00]">Program Utama</h2>
          <button
            onClick={() => handleEdit("Program Utama")}
            className="text-[#FB6B00] hover:text-orange-700"
          >
            <FaEdit />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.program.map((p, i) => (
            <div
              key={i}
              className="border border-orange-100 rounded-xl p-5 hover:shadow-md hover:scale-[1.02] transition-all duration-300 relative"
            >
              <h3 className="font-semibold text-[#FB6B00] mb-2">{p.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{p.desc}</p>
              <button
                onClick={() => handleDelete("program", i)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Target Pasar */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-[#FB6B00]">Target Pasar</h2>
          <button
            onClick={() => handleEdit("Target Pasar")}
            className="text-[#FB6B00] hover:text-orange-700"
          >
            <FaEdit />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.targetPasar.map((t, i) => (
            <div
              key={i}
              className="p-5 border border-orange-100 rounded-xl hover:bg-orange-50/50 transition-all duration-300 relative"
            >
              <div className="flex items-center gap-3 mb-3">
                {t.icon}
                <h3 className="font-semibold text-[#FB6B00]">{t.title}</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{t.desc}</p>
              <button
                onClick={() => handleDelete("targetPasar", i)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tim Kami */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-[#FB6B00]">Tim Kami</h2>
          <button
            onClick={() => handleEdit("Tim Kami")}
            className="text-[#FB6B00] hover:text-orange-700"
          >
            <FaEdit />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.tim.map((person, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 border border-orange-100 rounded-xl hover:shadow-md hover:scale-[1.03] transition-all duration-300 relative"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FB6B00] to-orange-400 mb-4"></div>
              <h3 className="font-semibold text-[#FB6B00]">{person.nama}</h3>
              <p className="text-gray-600 text-sm">{person.jabatan}</p>
              <button
                onClick={() => handleDelete("tim", i)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-10">
        © {new Date().getFullYear()} Dashboard Tentang Kami | Bank Jatah Indonesia
      </div>
    </section>
  );
}
