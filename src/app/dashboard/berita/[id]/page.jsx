"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import BeritaForm from "../form";

export default function EditBeritaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil data:", error);
      } else {
        setBerita(data);
      }
      setLoading(false);
    };

    fetchBerita();
  }, [id]);

  const handleSuccess = () => {
    alert("Berita berhasil diperbarui!");
    router.push("/dashboard/berita");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data berita...</p>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Berita tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Edit Berita
          </h1>
          <p className="text-gray-500 text-sm">
            Perbarui berita Bank Jatah Indonesia.
          </p>
        </div>
      </div>
      <BeritaForm beritaId={berita.id} onSuccess={handleSuccess} />
    </section>
  );
}
