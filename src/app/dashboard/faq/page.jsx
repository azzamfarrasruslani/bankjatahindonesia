"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function DashboardFAQPage() {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchFAQ();
  }, []);

  async function fetchFAQ() {
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Gagal memuat FAQ:", error);
    else setFaqList(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus pertanyaan ini?")) return;
    const { error } = await supabase.from("faq").delete().eq("id", id);
    if (error) alert("❌ Gagal menghapus FAQ.");
    else setFaqList((prev) => prev.filter((item) => item.id !== id));
  }

  const toggleAccordion = (index) => setOpenIndex(openIndex === index ? null : index);

  if (loading)
    return (
      <div className="p-10 text-center text-orange-600 font-medium animate-pulse">
        Memuat FAQ...
      </div>
    );

  // Ambil daftar kategori unik
  const categories = [...new Set(faqList.map((faq) => faq.kategori || "Umum"))];

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FB6B00]">Manajemen FAQ</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar pertanyaan umum Bank Jatah Indonesia.
          </p>
        </div>
        <Link
          href="/dashboard/faq/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah FAQ
        </Link>
      </div>

      {/* FAQ per kategori */}
      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold text-[#FB6B00] mb-2">{category}</h2>
          <ul className="overflow-hidden rounded-xl shadow-md border border-orange-100 bg-white divide-y divide-orange-100">
            {faqList
              .filter((faq) => (faq.kategori || "Umum") === category)
              .map((faq, index) => (
                <li
                  key={faq.id}
                  className={`transition-all duration-300 ${
                    openIndex === faq.id ? "bg-orange-50/40" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-orange-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{faq.pertanyaan}</h3>
                    </div>
                    <div className="text-[#FB6B00]">
                      {openIndex === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </button>

                  {openIndex === faq.id && (
                    <div className="px-6 pb-5 text-gray-600 text-sm border-t border-orange-100 bg-white">
                      <p className="mt-3 leading-relaxed">{faq.jawaban}</p>
                      <div className="flex justify-end mt-4 gap-3">
                        <Link
                          href={`/dashboard/faq/${faq.id}`}
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
        </div>
      ))}

      <div className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Dashboard FAQ | Bank Jatah Indonesia
      </div>
    </section>
  );
}
