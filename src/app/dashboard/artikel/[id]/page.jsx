"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ArtikelForm from "../form";
import { supabase } from "@/lib/supabaseClient";

export default function EditArtikelPage() {
  const router = useRouter();
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil data artikel:", error);
        setArtikel(null);
      } else {
        setArtikel(data);
      }
      setLoading(false);
    };

    fetchArtikel();
  }, [id]);

  const handleSuccess = () => {
    alert("Artikel berhasil diperbarui!");
    router.push("/dashboard/artikel");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data artikel...</p>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Artikel tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Edit Artikel
          </h1>
          <p className="text-gray-500 text-sm">
            Perbarui artikel Bank Jatah Indonesia.
          </p>
        </div>
      </div>

      <ArtikelForm artikel={artikel} onSuccess={handleSuccess} />
    </section>
  );
}
