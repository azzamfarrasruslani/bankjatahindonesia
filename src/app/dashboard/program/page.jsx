"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaRecycle, FaLeaf, FaHandsHelping } from "react-icons/fa";

export default function DashboardProgramPage() {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "Tabungan Jelantah",
      status: "Program Aktif",
      icon: <FaRecycle className="text-4xl text-[#FB6B00]" />,
      description:
        "Ubah minyak jelantah menjadi tabungan bernilai ekonomi. Program ini memungkinkan masyarakat menukar minyak jelantah dengan nilai tabungan digital.",
      detail: [
        "Warga membawa minyak jelantah dalam botol plastik bekas.",
        "Petugas menimbang dan mencatat volume.",
        "Sistem menambahkan poin/tabungan ke akun warga.",
      ],
      button: "Ikuti Program Ini",
    },
    {
      id: 2,
      title: "Jual Beli Jelantah",
      status: "Program Aktif",
      icon: <FaLeaf className="text-4xl text-[#FB6B00]" />,
      description:
        "Jual minyak bekas dengan harga bersaing dan ramah lingkungan. Program ini membuka akses jual beli minyak jelantah untuk rumah tangga dan UMKM.",
      detail: [
        "Daftar sebagai penjual di platform.",
        "Jadwalkan penjemputan atau setor ke pos terdekat.",
        "Terima pembayaran via transfer atau tunai.",
      ],
      button: "Ikuti Program Ini",
    },
    {
      id: 3,
      title: "Sedekah Jelantah",
      status: "Program Aktif",
      icon: <FaHandsHelping className="text-4xl text-[#FB6B00]" />,
      description:
        "Salurkan jelantah sebagai bentuk kepedulian untuk rumah ibadah & sosial. Hasil penjualannya akan didonasikan 100% untuk kegiatan sosial.",
      detail: [
        "Setor jelantah ke titik sedekah.",
        "Petugas mencatat dan menimbang.",
        "Hasil penjualan disalurkan ke lembaga sosial & dilaporkan ke penyumbang.",
      ],
      button: "Ikuti Program Ini",
    },
  ]);

  const handleAdd = () => {
    alert("Tambah program baru (belum terhubung ke backend).");
  };

  const handleEdit = (id) => {
    alert(`Edit program dengan ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus program ini?")) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      alert("Program berhasil dihapus.");
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen Program</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar program Bank Jatah Indonesia.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Program
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="relative bg-white border border-orange-100 shadow-sm hover:shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1"
          >
            {/* Tombol Edit dan Hapus */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleEdit(program.id)}
                className="p-2 bg-orange-50 hover:bg-orange-100 text-[#FB6B00] rounded-full shadow-sm transition-all"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(program.id)}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full shadow-sm transition-all"
                title="Hapus"
              >
                <FaTrash />
              </button>
            </div>

            {/* Konten Program */}
            <div className="mb-3 mt-4">{program.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {program.title}
            </h2>
            <span className="text-xs font-medium text-[#FB6B00] bg-[#FB6B00]/10 px-3 py-1 rounded-full mb-3">
              {program.status}
            </span>
            <p className="text-gray-600 text-sm mb-4">{program.description}</p>

            <ul className="text-gray-500 text-sm text-left mb-4 list-disc list-inside">
              {program.detail.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <button className="mt-auto bg-[#FB6B00] hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition-all duration-200">
              {program.button}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-8">
        © {new Date().getFullYear()} Dashboard Program | Bank Jatah Indonesia
      </div>
    </section>
  );
}
