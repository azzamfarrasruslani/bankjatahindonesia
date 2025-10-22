"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function DashboardFAQPage() {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Simulasi pemanggilan API
    setTimeout(() => {
      setFaqList([
        {
          id: 1,
          question: "Bagaimana cara mendaftar di Bank Jatah Indonesia?",
          answer:
            "Untuk mendaftar, pengguna dapat mengisi formulir pendaftaran melalui halaman 'Daftar' dan melengkapi data yang diminta. Setelah verifikasi email, akun akan aktif.",
          category: "Pendaftaran",
          created_at: "2025-10-20",
        },
        {
          id: 2,
          question: "Apakah layanan Bank Jatah Indonesia gratis?",
          answer:
            "Ya, layanan dasar seperti pendaftaran, pencatatan setoran, dan akses dashboard pengguna dapat digunakan secara gratis tanpa biaya langganan.",
          category: "Layanan",
          created_at: "2025-10-18",
        },
        {
          id: 3,
          question: "Bagaimana cara melakukan setoran minyak jelantah?",
          answer:
            "Pengguna dapat melakukan setoran dengan menghubungi mitra unit terdekat atau melalui aplikasi mobile Bank Jatah Indonesia untuk mengatur jadwal pengambilan.",
          category: "Transaksi",
          created_at: "2025-10-15",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus pertanyaan ini?")) return;
    setFaqList((prev) => prev.filter((item) => item.id !== id));
    alert("✅ FAQ berhasil dihapus (dummy data).");
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-orange-600 font-medium animate-pulse">
        Memuat FAQ...
      </div>
    );

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen FAQ</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar pertanyaan umum untuk halaman web Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah FAQ
        </Link>
      </div>

      {/* FAQ List */}
      <div className="overflow-hidden rounded-xl shadow-md border border-orange-100 bg-white">
        {faqList.length === 0 ? (
          <p className="text-center py-10 text-gray-400 italic bg-orange-50/30">
            Belum ada pertanyaan yang tercatat.
          </p>
        ) : (
          <ul className="divide-y divide-orange-100">
            {faqList.map((faq, index) => (
              <li
                key={faq.id}
                className={`transition-all duration-300 ${
                  openIndex === index ? "bg-orange-50/40" : "bg-white"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-orange-50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Kategori: {faq.category || "Umum"}
                    </p>
                  </div>
                  <div className="text-[#FB6B00]">
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 text-sm border-t border-orange-100 bg-white">
                    <p className="mt-3 leading-relaxed">{faq.answer}</p>
                    <div className="flex justify-end mt-4 gap-3">
                      <Link
                        href="#"
                        className="p-2 rounded-full hover:bg-orange-100 text-[#FB6B00] hover:text-orange-700 transition-all"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-all"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard FAQ | Bank Jatah Indonesia
      </div>
    </section>
  );
}
