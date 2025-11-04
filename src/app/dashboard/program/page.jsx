"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from("program")
          .select("*")
          .order("id");

        if (error) throw error;
        setPrograms(data || []);
      } catch (err) {
        console.error("Gagal ambil data:", err);
        alert("Gagal memuat data program.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus program ini?")) return;
    try {
      const { error } = await supabase.from("program").delete().eq("id", id);
      if (error) throw error;
      setPrograms((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Gagal hapus data.");
    }
  };

  return (
    <section className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-orange-200 pb-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#FB6B00]">
            Manajemen Program
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola daftar program Bank Jatah Indonesia.
          </p>
        </div>

        <Link
          href="/dashboard/program/tambah"
          className="flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Tambah Program
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          // Loading state di area grid
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-orange-100 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center animate-pulse"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full mb-4" />
              <div className="h-4 bg-orange-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-orange-50 rounded w-1/2 mb-1" />
              <div className="h-3 bg-orange-50 rounded w-5/6" />
            </div>
          ))
        ) : programs.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400 italic bg-orange-50/30 rounded-lg">
            Belum ada program yang tercatat.
          </div>
        ) : (
          programs.map((program) => (
            <div
              key={program.id}
              className="relative bg-white border border-orange-100 shadow-sm hover:shadow-lg rounded-xl overflow-hidden transition-all"
            >
              {/* Tombol Edit dan Hapus */}
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button
                  onClick={() =>
                    router.push(`/dashboard/program/${program.id}`)
                  }
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

              {/* Gambar Header */}
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${program.icon_url})` }}
              >
                <div className="absolute inset-0"></div>
              </div>

              {/* Konten Program */}
              <div className="p-6 flex  flex-col items-center text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {program.title}
                </h2>
                <span className="text-xs font-medium text-[#FB6B00] bg-[#FB6B00]/10 px-3 py-1 rounded-full mb-3">
                  {program.status}
                </span>
                <p className="text-gray-600 text-sm mb-4">
                  {program.description}
                </p>

                {program.details && Array.isArray(program.details) && (
                  <ul className="text-gray-500 text-sm text-left mb-2 list-disc list-inside">
                    {program.details.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-8">
        © {new Date().getFullYear()} Dashboard Program | Bank Jatah Indonesia
      </div>
    </section>
  );
}
