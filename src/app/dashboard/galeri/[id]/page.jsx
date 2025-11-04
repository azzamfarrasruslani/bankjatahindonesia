"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import GaleriForm from "../form";

export default function EditGaleriPage() {
  const { id } = useParams();
  const router = useRouter();
  const [galeri, setGaleri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil data galeri:", error.message);
      } else {
        setGaleri(data);
      }
      setLoading(false);
    };

    fetchGaleri();
  }, [id]);

  const handleSuccess = () => {
    alert("✅ Data galeri berhasil diperbarui!");
    router.push("/dashboard/galeri");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data galeri...</p>
      </div>
    );
  }

  if (!galeri) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Galeri tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-md">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FB6B00] mb-1">
            Edit Galeri
          </h1>
          <p className="text-gray-500 text-sm">
            Perbarui foto kegiatan dan deskripsi galeri Bank Jatah Indonesia.
          </p>
        </div>
      </div>
      <GaleriForm galeriId={id} onSuccess={handleSuccess} />
    </section>
  );
}
