"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import GaleriForm from "../form";

export default function EditGaleriPage() {
  const { id } = useParams();
  const router = useRouter();
  const [galeri, setGaleri] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGaleri = async () => {
    const { data, error } = await supabase
      .from("galeri")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("❌ Gagal memuat data galeri.");
      router.push("/dashboard/galeri");
    } else {
      setGaleri(data);
    }
    setLoading(false);
  };

  const handleSuccess = () => {
    alert("✅ Data galeri berhasil diperbarui!");
    router.push("/dashboard/galeri");
  };

  useEffect(() => {
    fetchGaleri();
  }, [id]);

  if (loading)
    return (
      <p className="text-center py-20 text-gray-500">Memuat data galeri...</p>
    );

  if (!galeri)
    return (
      <p className="text-center py-20 text-red-500">Data tidak ditemukan.</p>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-orange-100">
        <h1 className="text-3xl font-bold text-[#FB6B00] mb-2">Edit Galeri</h1>
        <p className="text-gray-500 mb-6">
          Perbarui informasi dan foto dokumentasi kegiatan.
        </p>

        <GaleriForm galeri={galeri} onSuccess={handleSuccess} />
      </div>
    </section>
  );
}
